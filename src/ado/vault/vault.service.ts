import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AndrStrategy, Coin } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { INVALID_QUERY_ERR } from '../types/ado.constants'

@Injectable()
export class VaultService extends AdoService {
  constructor(
    @InjectPinoLogger(VaultService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async balance(contractAddress: string, address: string): Promise<Coin[]> {
    const query = {
      balance: {
        address: address,
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(contractAddress, query)
      return queryResponse as Coin[]
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async strategyAddress(contractAddress: string, strategy: string): Promise<AndrStrategy> {
    const query = {
      strategy_address: {
        strategy: strategy,
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(contractAddress, query)
      return queryResponse as AndrStrategy
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
