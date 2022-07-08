import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { RateInfo, RatesQuery } from './types'

@Injectable()
export class RatesAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(RatesAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async payments(contractAddress: string): Promise<RateInfo[]> {
    const query = {
      payments: {},
    }

    try {
      const ratesInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      console.log(ratesInfo)
      return (ratesInfo as RatesQuery).payments
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
