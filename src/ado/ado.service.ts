import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AdoType } from 'src/ado/types/ado.enums'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoContract, AdoContractError, AdoContractResult } from './types'
import {
  ANDR_QUERY,
  APP_QUERY,
  CROWDFUND_QUERY,
  CW20Token_QUERY,
  DEFAULT_CATCH_ERR,
  INVALID_ADO,
  NFT_QUERY,
  SPLITTER_QUERY,
  VAULT_QUERY,
} from './types/ado.constants'

@Injectable()
export class AdoService {
  constructor(
    @InjectPinoLogger(AdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {}

  public async getContract(address: string): Promise<typeof AdoContractResult> {
    try {
      const contractInfo = await this.wasmService.getContract(address)
      if ('error' in contractInfo) {
        return { code: contractInfo.code ?? -1, error: contractInfo.error } as AdoContractError
      }

      if ('queries_expected' in contractInfo) {
        if (contractInfo.queries_expected && contractInfo.queries_expected.includes(ANDR_QUERY)) {
          const adoContractInfo = contractInfo as AdoContract
          let adoType = AdoType.Ado

          if (contractInfo.queries_expected.includes(APP_QUERY)) {
            adoType = AdoType.App
          } else if (contractInfo.queries_expected.includes(CW20Token_QUERY)) {
            adoType = AdoType.CW20Token
          } else if (contractInfo.queries_expected.includes(CW20Token_QUERY)) {
            adoType = AdoType.CW20Token
          } else if (contractInfo.queries_expected.includes(CROWDFUND_QUERY)) {
            adoType = AdoType.Crowdfund
          } else if (contractInfo.queries_expected.includes(NFT_QUERY)) {
            adoType = AdoType.NFT
          } else if (contractInfo.queries_expected.includes(SPLITTER_QUERY)) {
            adoType = AdoType.Splitter
          } else if (contractInfo.queries_expected.includes(VAULT_QUERY)) {
            adoType = AdoType.Vault
          } else if (contractInfo.queries_expected.length === 1) {
            // only andr_query exists for Primitive
            adoType = AdoType.Primitive
          }

          adoContractInfo.adoType = adoType
          return adoContractInfo
        }
      }

      return { code: 1, error: INVALID_ADO } as AdoContractError
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      const errMsg = err.toString()
      if (errMsg) {
        return { code: -1, error: errMsg } as AdoContractError
      }

      throw new Error(err)
    }
  }

  public async owner(address: string): Promise<string> {
    const queryMsg = {
      andr_query: {
        owner: {},
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsg)
      return queryResponse.owner
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async operators(address: string): Promise<string[]> {
    const queryMsg = {
      andr_query: {
        operators: {},
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsg)
      return queryResponse.operators
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async isOperator(address: string, operator: string): Promise<boolean> {
    const queryMsg = {
      andr_query: {
        is_operator: {
          address: operator,
        },
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsg)
      return queryResponse.isOperator ?? false
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }
}
