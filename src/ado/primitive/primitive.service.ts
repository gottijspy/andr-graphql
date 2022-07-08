import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { LCDClientError } from '../common/errors'
import { PrimitiveResponse } from './types'

@Injectable()
export class PrimitiveAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(PrimitiveAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async getValue(contractAddress: string, key: string): Promise<PrimitiveResponse> {
    const encodedKey = Buffer.from(JSON.stringify(key)).toString('base64')
    console.log(encodedKey)
    const query = {
      andr_query: {
        get: encodedKey,
      },
    }

    try {
      const queryResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      console.log(queryResponse)
      return queryResponse
    } catch (err) {
      console.log('error: ' + err)
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
