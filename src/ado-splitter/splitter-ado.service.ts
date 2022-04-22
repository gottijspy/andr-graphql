import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrQueryService } from 'src/ado-common/models'
import { LCDClientError } from 'src/common/errors'
import { Splitter, SplitterQuery } from './types'

@Injectable()
export class SplitterAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(SplitterAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
  ) {
    super(logger, lcdService)
  }

  public async config(contractAddress: string): Promise<Splitter> {
    const query = {
      get_splitter_config: {},
    }

    try {
      const splitter = await this.lcdService.wasm.contractQuery<SplitterQuery>(contractAddress, query)
      console.log(splitter.config)
      return splitter.config
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
