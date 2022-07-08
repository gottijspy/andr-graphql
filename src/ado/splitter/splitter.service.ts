import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { Splitter, SplitterQuery } from './types'

@Injectable()
export class SplitterAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(SplitterAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async config(contractAddress: string): Promise<Splitter> {
    const query = {
      get_splitter_config: {},
    }

    try {
      const splitter = await this.cosmService.queryContractSmart(contractAddress, query)
      console.log(splitter.config)
      return (splitter as SplitterQuery).config
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
