import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { FACTORY_QUERY_KEY, INVALID_QUERY_ERR } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'

@Injectable()
export class FactoryService extends AdoService {
  constructor(
    @InjectPinoLogger(FactoryService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async getCodeId(contractAddress: string, key: string): Promise<number> {
    const queryMsgStr = JSON.stringify(queryMsgs.factory.code_id).replace(FACTORY_QUERY_KEY, key)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const queryResponse = await this.wasmService.queryContract(contractAddress, queryMsg)
      return queryResponse
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
