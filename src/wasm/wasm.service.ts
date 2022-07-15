import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectCosmClient } from 'src/cosm'
import { WasmContract, WasmContractError, WasmContractQueryError, WasmContractResult } from './types/wasm.contract'

@Injectable()
export class WasmService {
  constructor(
    @InjectPinoLogger(WasmService.name)
    protected readonly logger: PinoLogger,
    @InjectCosmClient()
    protected readonly cosmWasmClient: CosmWasmClient,
  ) {}

  public async getContract(address: string): Promise<typeof WasmContractResult> {
    try {
      const contractInfo = await this.cosmWasmClient.getContract(address)
      const queries = await this.getContractQueries(address)

      return { ...contractInfo, queries_expected: queries } as WasmContract
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', address)
      return this.parseError(err)
    }
  }

  public async queryContract(address: string, queryMsg: Record<string, unknown>): Promise<any> {
    try {
      const queryResult = await this.cosmWasmClient.queryContractSmart(address, queryMsg)
      return queryResult
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', address)

      const wasmContractError = this.parseError(err)

      return wasmContractError.error ? ({ ...wasmContractError, queryMsg } as WasmContractQueryError) : new Error(err)
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

  private parseError(error: any): WasmContractError {
    const emptyError: WasmContractError = { code: -1, error: '' }
    try {
      const errMsg = error.toString()
      if (!errMsg) {
        return emptyError
      }

      let errNum = -1
      const pattern = /(\d+)/g
      const current = pattern.exec(errMsg)
      if (current && current[0]) {
        errNum = Number(current[0])
      }

      return { code: errNum, error: errMsg } as WasmContractError
    } catch (err: any) {
      this.logger.error({ err, error }, 'Error parsing error into WasmContractError')
      return emptyError
    }
  }
}
