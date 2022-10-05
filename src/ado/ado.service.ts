import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AdoType } from 'src/ado/types/ado.enums'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoContract } from './types'
import {
  ANDR_QUERY,
  ANDR_QUERY_OPERATOR,
  APP_QUERY,
  AUCTION_QUERY,
  CROWDFUND_QUERY,
  CW20Token_QUERY,
  DEFAULT_CATCH_ERR,
  FACTORY_QUERY,
  INVALID_ADO_ERR,
  INVALID_QUERY_ERR,
  NFT_QUERY,
  SPLITTER_QUERY,
  VAULT_QUERY,
} from './types/ado.constants'
import { queryMsgs } from './types/ado.querymsg'

@Injectable()
export class AdoService {
  constructor(
    @InjectPinoLogger(AdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {}

  public async getContract(address: string, adoType?: AdoType): Promise<AdoContract> {
    try {
      const contractInfo = await this.wasmService.getContract(address)
      const adoContractInfo = contractInfo as AdoContract

      if (!adoType) {
        contractInfo.queries_expected = await this.wasmService.getContractQueries(address)
        if (!contractInfo.queries_expected || !contractInfo.queries_expected.includes(ANDR_QUERY)) {
          throw new UserInputError(INVALID_ADO_ERR)
        }

        adoType = this.getAdoType(contractInfo.queries_expected)
      }

      adoContractInfo.adoType = adoType
      return adoContractInfo
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_ADO_ERR)
    }
  }

  public async owner(address: string): Promise<string> {
    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsgs.ado.owner)
      return queryResponse.owner
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async operators(address: string): Promise<string[]> {
    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsgs.ado.operators)
      return queryResponse.operators
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async isOperator(address: string, operator: string): Promise<boolean> {
    const queryMsgStr = JSON.stringify(queryMsgs.ado.is_operator).replace(ANDR_QUERY_OPERATOR, operator)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const queryResponse = await this.wasmService.queryContract(address, queryMsg)
      return queryResponse.isOperator ?? false
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  private getAdoType(allowed_quries: string[]): AdoType {
    let adoType = AdoType.Unknown

    if (allowed_quries.includes(APP_QUERY)) {
      adoType = AdoType.App
    } else if (allowed_quries.includes(CW20Token_QUERY)) {
      adoType = AdoType.CW20
    } else if (allowed_quries.includes(CROWDFUND_QUERY)) {
      adoType = AdoType.Crowdfund
    } else if (allowed_quries.includes(FACTORY_QUERY)) {
      adoType = AdoType.Factory
    } else if (allowed_quries.includes(NFT_QUERY)) {
      adoType = AdoType.CW721
    } else if (allowed_quries.includes(AUCTION_QUERY)) {
      adoType = AdoType.Auction
    } else if (allowed_quries.includes(SPLITTER_QUERY)) {
      adoType = AdoType.Splitter
    } else if (allowed_quries.includes(VAULT_QUERY)) {
      adoType = AdoType.Vault
    } else if (allowed_quries.length === 1) {
      // only andr_query exists for Primitive
      adoType = AdoType.Primitive
    }

    return adoType
  }
}
