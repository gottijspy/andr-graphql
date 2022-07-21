import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { TxInfo } from 'src/ado/types'
import { InjectCosmClient } from 'src/cosm'
import {
  INTERNAL_TX_QUERY_ERR,
  LOG_ERR_TX_QRY_ACCT_TXT,
  LOG_ERR_TX_QRY_CNTRCT_TXT,
  LOG_ERR_TX_QRY_HT_TXT,
  LOG_ERR_TX_QRY_TXT,
} from './types/tx.constants'
import { TxFilterParams } from './types/tx.result'

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
      const txInfo = await this.cosmWasmClient.getTx(hash)
      return txInfo as TxInfo
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_TXT, hash)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byHeight(height: number): Promise<TxInfo[]> {
    try {
      const txInfo = await this.cosmWasmClient.searchTx({ height: height })
      return txInfo as TxInfo[]
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_HT_TXT, height)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byContract(contractAddress: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const txInfo = await this.cosmWasmClient.searchTx(
        {
          tags: [
            { key: 'execute._contract_address', value: contractAddress },
            { key: 'message.module', value: 'wasm' },
          ],
        },
        filterParams,
      )

      return txInfo as TxInfo[]
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_CNTRCT_TXT, contractAddress)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }

  public async byAccount(sentFromOrTo: string, filterParams?: TxFilterParams): Promise<TxInfo[]> {
    try {
      const txInfo = await this.cosmWasmClient.searchTx({ sentFromOrTo: sentFromOrTo }, filterParams)
      return txInfo as TxInfo[]
    } catch (err: any) {
      this.logger.error({ err }, LOG_ERR_TX_QRY_ACCT_TXT, sentFromOrTo)
      throw new ApolloError(INTERNAL_TX_QUERY_ERR)
    }
  }
}
