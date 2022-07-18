import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { CrowdfundConfig, CrowdfundState } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { CROWDFUND_QUERY_TOKEN_ID, DEFAULT_CATCH_ERR, INVALID_QUERY_ERR } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'

@Injectable()
export class CrowdfundService extends AdoService {
  constructor(
    @InjectPinoLogger(CrowdfundService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  //FIX: State not found
  public async state(address: string): Promise<CrowdfundState> {
    try {
      const crowdfundState = await this.wasmService.queryContract(address, queryMsgs.crowdfund.state)
      return crowdfundState
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async config(address: string): Promise<CrowdfundConfig> {
    try {
      const crowdfundConfig = await this.wasmService.queryContract(address, queryMsgs.crowdfund.config)
      console.log(crowdfundConfig)
      return crowdfundConfig
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async availableTokens(address: string): Promise<string[]> {
    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsgs.crowdfund.available_tokens)
      return queryResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async isTokenAvailable(address: string, tokenId: string): Promise<boolean> {
    const queryMsgStr = JSON.stringify(queryMsgs.crowdfund.is_token_available).replace(
      CROWDFUND_QUERY_TOKEN_ID,
      tokenId,
    )
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsg)
      return queryResponse ?? false
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
