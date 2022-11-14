import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { INVALID_QUERY_ERR } from '../types/ado.constants'
import { CW20Schema, TokenInfo } from './types'

@Injectable()
export class CW20Service extends AdoService {
  constructor(
    @InjectPinoLogger(CW20Service.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async tokenInfo(contractAddress: string): Promise<TokenInfo> {
    try {
      const tokenInfo = await this.wasmService.queryContract(contractAddress, CW20Schema.token_info)
      return tokenInfo as TokenInfo
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
