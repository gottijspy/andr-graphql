import { configs, getConfigByChainID } from '@andromedaprotocol/andromeda.js'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
//import { decodeTxRaw } from '@cosmjs/proto-signing'
import { Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectCosmClient } from 'src/cosm'
import { BlockInfo } from './types/block.result'
import {
  INTERNAL_TX_QUERY_ERR,
  INVALID_CHAIN_ERR,
  LOG_ERR_TX_QRY_ACCT_TXT,
  LOG_ERR_TX_QRY_CNTRCT_TXT,
  LOG_ERR_TX_QRY_HT_TXT,
  LOG_ERR_TX_QRY_OWNR_TXT,
  LOG_ERR_TX_QRY_TAG_TXT,
  LOG_ERR_TX_QRY_TXT,
  NOT_FOUND_ERR,
} from './types/tx.constants'
import { TxFilterParams, TxInfo, TxLog, TxSearchByTagArgs } from './types/tx.result'

@Injectable()
export class TxService {
  constructor(
    @InjectPinoLogger(TxService.name)
    protected readonly logger: PinoLogger,
    @InjectCosmClient()
    protected readonly cosmWasmClient: CosmWasmClient,
  ) {}

  public async byHash(chainId: string, hash: string): Promise<TxInfo> {
    try {
      const chainUrl = this.getChainUrl(chainId)
      if (!chainUrl) throw new UserInputError(NOT_FOUND_ERR)

      const queryClient = await CosmWasmClient.connect(chainUrl)
      const IndexedTx = await queryClient.getTx(hash)

      let txInfo = IndexedTx as TxInfo
      txInfo = this.parseTx(txInfo)
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_TXT, hash)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byHeight(chainId: string, height: number): Promise<TxInfo[]> {
    try {
      const chainUrl = this.getChainUrl(chainId)
      if (!chainUrl) throw new UserInputError(NOT_FOUND_ERR)

      const queryClient = await CosmWasmClient.connect(chainUrl)
      const indexedTxs = await queryClient.searchTx({ height: height })

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_HT_TXT, height)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byContract(chainId: string, contractAddress: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const chainUrl = this.getChainUrl(chainId)
      if (!chainUrl) throw new UserInputError(NOT_FOUND_ERR)

      const queryClient = await CosmWasmClient.connect(chainUrl)
      const indexedTxs = await queryClient.searchTx(
        {
          tags: [
            { key: 'execute._contract_address', value: contractAddress },
            { key: 'message.module', value: 'wasm' },
          ],
        },
        filterParams,
      )

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_CNTRCT_TXT, contractAddress)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byAccount(chainId: string, sentFromOrTo: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const chainUrl = this.getChainUrl(chainId)
      if (!chainUrl) throw new UserInputError(NOT_FOUND_ERR)

      const queryClient = await CosmWasmClient.connect(chainUrl)
      const indexedTxs = await queryClient.searchTx({ sentFromOrTo: sentFromOrTo }, filterParams)

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_ACCT_TXT, sentFromOrTo)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byOwner(chainId: string, walletAddress: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    const chainUrl = this.getChainUrl(chainId)

    try {
      const queryClient = await CosmWasmClient.connect(chainUrl)
      const indexedTxs = await queryClient.searchTx(
        {
          tags: [
            { key: 'wasm.owner', value: walletAddress },
            { key: 'wasm.method', value: 'instantiate' },
          ],
        },
        filterParams,
      )

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_OWNR_TXT, walletAddress)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byTag(chainId: string, tags: TxSearchByTagArgs, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    const chainUrl = this.getChainUrl(chainId)

    try {
      const queryClient = await CosmWasmClient.connect(chainUrl)
      const indexedTxs = await queryClient.searchTx(tags, filterParams)

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_TAG_TXT, tags)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async getBlockInfo(chainId: string, height: number): Promise<BlockInfo> {
    try {
      const chainUrl = this.getChainUrl(chainId)
      if (!chainUrl) throw new UserInputError(NOT_FOUND_ERR)

      const queryClient = await CosmWasmClient.connect(chainUrl)
      const blockInfo = await queryClient.getBlock(height)
      return blockInfo as BlockInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_HT_TXT, height)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  private getChainUrl(chainId: string, address?: string): string {
    const chainConfig = address ? configs.find((c) => address.startsWith(c.addressPrefix)) : getConfigByChainID(chainId)

    if (!chainConfig?.chainUrl) throw new UserInputError(INVALID_CHAIN_ERR)
    return chainConfig?.chainUrl
  }

  private parseTx(tx: TxInfo): TxInfo {
    if (tx.rawLog) {
      tx.txLog = JSON.parse(tx.rawLog) as TxLog[]
      tx.events = tx.txLog.flatMap((log) => log.events)
      //[ ...rawLogJSON[0].events ]
    }

    // if (tx.tx){
    //   const txRaw = decodeTxRaw(tx.tx))
    // }

    return tx
  }
}
