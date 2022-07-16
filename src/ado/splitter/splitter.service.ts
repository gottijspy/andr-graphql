import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Splitter, SplitterContract } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'

@Injectable()
export class SplitterService extends AdoService {
  constructor(
    @InjectPinoLogger(SplitterService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async config(contractAddress: string): Promise<Splitter> {
    const query = {
      get_splitter_config: {},
    }

    try {
      const splitter = await this.wasmService.queryContract(contractAddress, query)
      console.log(splitter.config)
      return (splitter as SplitterContract).config
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new Error(err)
    }
  }
}
