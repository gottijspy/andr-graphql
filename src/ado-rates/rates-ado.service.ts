import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrQueryService } from 'src/ado-common/models'
import { LCDClientError } from 'src/common/errors'
import { RateInfo, RatesQuery } from './types'

@Injectable()
export class RatesAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(RatesAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
  ) {
    super(logger, lcdService)
  }

  public async payments(contractAddress: string): Promise<RateInfo[]> {
    const query = {
      payments: {},
    }

    try {
      const ratesInfo = await this.lcdService.wasm.contractQuery<RatesQuery>(contractAddress, query)
      console.log(ratesInfo)
      return ratesInfo.payments
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
