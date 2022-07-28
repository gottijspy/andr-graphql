import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
//import { decodeTxRaw } from '@cosmjs/proto-signing'
import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectCosmClient } from 'src/cosm'
import { BlockInfo } from './types/block.result'
import {
  INTERNAL_TX_QUERY_ERR,
  LOG_ERR_TX_QRY_ACCT_TXT,
  LOG_ERR_TX_QRY_CNTRCT_TXT,
  LOG_ERR_TX_QRY_HT_TXT,
  LOG_ERR_TX_QRY_OWNR_TXT,
  LOG_ERR_TX_QRY_TAG_TXT,
  LOG_ERR_TX_QRY_TXT,
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

  public async byHash(hash: string): Promise<TxInfo> {
    try {
      const IndexedTx = await this.cosmWasmClient.getTx(hash)

      let txInfo = IndexedTx as TxInfo
      txInfo = this.parseTx(txInfo)
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_TXT, hash)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byHeight(height: number): Promise<TxInfo[]> {
    try {
      const indexedTxs = await this.cosmWasmClient.searchTx({ height: height })

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_HT_TXT, height)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byContract(contractAddress: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const indexedTxs = await this.cosmWasmClient.searchTx(
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

  public async byAccount(sentFromOrTo: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const indexedTxs = await this.cosmWasmClient.searchTx({ sentFromOrTo: sentFromOrTo }, filterParams)

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_ACCT_TXT, sentFromOrTo)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byOwner(walletAddress: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const indexedTxs = await this.cosmWasmClient.searchTx(
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

  public async byTag(tags: TxSearchByTagArgs, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const indexedTxs = await this.cosmWasmClient.searchTx(tags, filterParams)

      let txInfo = indexedTxs as TxInfo[]
      txInfo = txInfo.map((tx) => this.parseTx(tx))
      return txInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_TAG_TXT, tags)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async getBlockInfo(height: number): Promise<BlockInfo> {
    try {
      const blockInfo = await this.cosmWasmClient.getBlock(height)
      return blockInfo as BlockInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_HT_TXT, height)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  private parseTx(tx: TxInfo): TxInfo {
    if (tx.rawLog) {
      tx.txLog = JSON.parse(tx.rawLog) as TxLog[]
      tx.events = tx.txLog.flatMap((log) => log.events)
      //[ ...rawLogJSON[0].events ]
    }

    // if (tx.tx){
    //   console.log(decodeTxRaw(tx.tx))
    // }

    return tx
  }
}
