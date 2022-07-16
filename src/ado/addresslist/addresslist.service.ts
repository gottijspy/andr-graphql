import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { AddresslistResponse } from '../types'

@Injectable()
export class AddresslistService extends AdoService {
  constructor(
    @InjectPinoLogger(AddresslistService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async includesAddress(contractAddress: string, address: string): Promise<AddresslistResponse> {
    const query = {
      includes_address: {
        address: address,
      },
    }

    try {
      const response = await this.wasmService.queryContract(contractAddress, query)
      return response as AddresslistResponse
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new Error(err)
    }
  }
}
