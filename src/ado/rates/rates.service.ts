import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { RateInfo, RatesContract } from '../types'

@Injectable()
export class RatesService extends AdoService {
  constructor(
    @InjectPinoLogger(RatesService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async payments(contractAddress: string): Promise<RateInfo[]> {
    const query = {
      payments: {},
    }

    try {
      const ratesInfo = await this.wasmService.queryContract(contractAddress, query)
      console.log(ratesInfo)
      return (ratesInfo as RatesContract).payments
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new Error(err)
    }
  }
}
