import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { InjectCosmClient } from 'src/cosm'
import { LCDClientError } from '../common/errors'
import { AndrQueryService } from '../common/models'
import { TokenInfo, TxInfo } from './types'

@Injectable()
export class CW20TokenAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(CW20TokenAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async tokenInfo(contractAddress: string): Promise<TokenInfo> {
    const query = {
      token_info: {},
    }

    try {
      const tokenInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      console.log(tokenInfo)
      return tokenInfo as TokenInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async tx(contractAddress: string, blockHeight: number): Promise<[TxInfo]> {
    const query = {
      tags: [
        { key: 'execute._contract_address', value: contractAddress },
        { key: 'message.module', value: 'wasm' },
      ],
    }

    // Optionally can set these for a blockheight range
    const filter = { minHeight: blockHeight, maxHeight: blockHeight }

    try {
      const txs = await this.cosmService.searchTx(query, filter)

      console.log(txs)
      return txs as [TxInfo]
    } catch (err) {
      this.logger.error({ err }, 'Error getting transactions for the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
