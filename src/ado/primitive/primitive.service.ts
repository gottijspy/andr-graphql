import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { PrimitiveResponse } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { LCDClientError } from '../common/errors'

@Injectable()
export class PrimitiveAdoService extends AdoService {
  constructor(
    @InjectPinoLogger(PrimitiveAdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
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
      const queryResponse = await this.wasmService.queryContract(contractAddress, query)
      console.log(queryResponse)
      return queryResponse
    } catch (err) {
      console.log('error: ' + err)
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
