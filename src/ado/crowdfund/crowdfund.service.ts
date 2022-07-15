import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { CrowdfundConfig, CrowdfundState } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { DEFAULT_CATCH_ERR } from '../types/ado.constants'

@Injectable()
export class CrowdfundAdoService extends AdoService {
  constructor(
    @InjectPinoLogger(CrowdfundAdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  // public async getCrowdfundContract(address: string): Promise<typeof CrowdfundContractResult>{
  //   try {
  //     const contractInfo = await this.getContract(address)
  //     console.log(contractInfo)
  //     if ('queries_expected' in contractInfo) {
  //       if (contractInfo.queries_expected && contractInfo.queries_expected.includes(CROWDFUND_QUERY)) {
  //         return contractInfo as CrowdfundContract
  //       }
  //     }

  //     console.log('Message')
  //     if ('message' in contractInfo) {
  //       if (contractInfo.message){
  //         return { code: contractInfo.code ?? -1, message: contractInfo.message }
  //       }
  //     }

  //     return { code: 1, message: INVALID_ADO_CROWDFUND }
  //   } catch(err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     const errMsg = err.toString()
  //     if (errMsg) {
  //       return { code: -1, message: errMsg } as AdoContractError
  //     }

  //     throw new Error(err)
  //   }
  // }

  //FIX: State not found
  public async state(address: string): Promise<CrowdfundState> {
    const query = {
      state: {},
    }

    try {
      const crowdfundState = await this.wasmService.queryContract(address, query)
      return crowdfundState
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async config(address: string): Promise<CrowdfundConfig> {
    const query = {
      config: {},
    }

    try {
      const crowdfundConfig = await this.wasmService.queryContract(address, query)
      console.log(crowdfundConfig)
      return crowdfundConfig
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async availableTokens(address: string): Promise<string[]> {
    const query = {
      available_tokens: {},
    }

    try {
      const queryResponse = await this.wasmService.queryContract(address, query)
      return queryResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async isTokenAvailable(address: string, tokenId: string): Promise<boolean> {
    const query = {
      is_token_available: {
        id: tokenId,
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(address, query)
      return queryResponse ?? false
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }
}
