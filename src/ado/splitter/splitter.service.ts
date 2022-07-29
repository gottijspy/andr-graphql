import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Splitter, SplitterContract } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { INVALID_QUERY_ERR } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'

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
    try {
      const splitter = await this.wasmService.queryContract(contractAddress, queryMsgs.splitter.config)
      return (splitter as SplitterContract).config ?? {}
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
