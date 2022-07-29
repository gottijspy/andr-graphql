import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectCosmClient } from 'src/cosm'
import {
  INTERNAL_CONTRACT_ERR,
  INVALID_QUERY_ERR,
  INVALID_REQUEST_TEXT,
  LOGGER_ERROR_QUERY_TEXT,
  LOGGER_ERROR_CONTRACT_TEXT,
  NOT_FOUND_ERR,
} from './types/wasm.constants'
import { WasmContract } from './types/wasm.contract'

@Injectable()
export class WasmService {
  constructor(
    @InjectPinoLogger(WasmService.name)
    protected readonly logger: PinoLogger,
    @InjectCosmClient()
    protected readonly cosmWasmClient: CosmWasmClient,
  ) {}

  public async getContract(address: string): Promise<WasmContract> {
    try {
      const contractInfo = await this.cosmWasmClient.getContract(address)
      const queries = await this.getContractQueries(address)

      return { ...contractInfo, queries_expected: queries } as WasmContract
    } catch (err: any) {
      this.logger.error({ err }, LOGGER_ERROR_CONTRACT_TEXT, address)

      const errMsg = err.toString()
      if (errMsg && errMsg.includes(INVALID_REQUEST_TEXT)) {
        throw new UserInputError(NOT_FOUND_ERR)
      }

      throw new ApolloError(INTERNAL_CONTRACT_ERR)
    }
  }

  public async queryContract(address: string, queryMsg: Record<string, unknown>): Promise<any> {
    try {
      const queryResult = await this.cosmWasmClient.queryContractSmart(address, queryMsg)
      return queryResult
    } catch (err: any) {
      this.logger.error({ err }, LOGGER_ERROR_QUERY_TEXT, address, queryMsg)
      throw new ApolloError(INVALID_QUERY_ERR, 'WASM_QUERYMSG_ERROR', { queryMsg })
    }
  }

  private async getContractQueries(address: string): Promise<string[]> {
    let queries: string[] = []
    const pattern = /`.*?`/g
    let current: any

    try {
      queries = await this.cosmWasmClient.queryContractSmart(address, { query_msgs: {} })
      return queries
    } catch (err: any) {
      const errMsg = err.toString()
      while ((current = pattern.exec(errMsg))) queries.push(current[0].replace(/`/g, ''))

      queries.shift()
      return queries
    }
  }
}

// private parseError(error: any): WasmContractError {
//   const emptyError: WasmContractError = { code: -1, error: '' }
//   try {
//     const errMsg = error.toString()
//     if (!errMsg) {
//       return emptyError
//     }

//     let errNum = -1
//     const pattern = /(\d+)/g
//     const current = pattern.exec(errMsg)
//     if (current && current[0]) {
//       errNum = Number(current[0])
//     }

//     return { code: errNum, error: errMsg } as WasmContractError
//   } catch (err: any) {
//     this.logger.error({ err, error }, 'Error parsing error into WasmContractError')
//     return emptyError
//   }
// }
