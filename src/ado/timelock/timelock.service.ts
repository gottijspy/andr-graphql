import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { Escrow, LockedFunds } from '../types'

@Injectable()
export class TimelockService extends AdoService {
  constructor(
    @InjectPinoLogger(TimelockService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async getLockedFunds(contractAddress: string, owner: string, recipient: string): Promise<Escrow> {
    const query = {
      get_locked_funds: {
        owner: owner,
        recipient: recipient,
      },
    }

    try {
      const lockedFunds = await this.wasmService.queryContract(contractAddress, query)
      console.log(lockedFunds)
      return (lockedFunds as LockedFunds).funds ?? ({} as Escrow)
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new Error(err)
    }
  }
}
