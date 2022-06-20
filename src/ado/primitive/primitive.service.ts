import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'

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
}
