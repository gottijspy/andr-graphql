import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { InjectCosmClient } from 'src/cosm'
import { LCDClientError } from '../common/errors'
import { AndrQueryService } from '../common/models'
import { Escrow, LockedFunds } from './types'

@Injectable()
export class TimelockAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(TimelockAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async getLockedFunds(contractAddress: string, owner: string, recipient: string): Promise<Escrow> {
    const query = {
      get_locked_funds: {
        owner: owner,
        recipient: recipient,
      },
    }

    try {
      const lockedFunds = await this.lcdService.wasm.contractQuery<LockedFunds>(contractAddress, query)
      console.log(lockedFunds)
      return lockedFunds.funds ?? ({} as Escrow)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
