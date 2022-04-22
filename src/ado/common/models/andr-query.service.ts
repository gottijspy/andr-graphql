import { Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQuery } from '../interfaces'

@Injectable()
export abstract class AndrQueryService {
  constructor(protected readonly logger: PinoLogger, protected readonly lcdService: LCDClient) {}

  public async owner(contractAddress: string): Promise<string> {
    const query = {
      andr_query: {
        owner: {},
      },
    }

    try {
      const queryResponse = await this.lcdService.wasm.contractQuery<AndrQuery>(contractAddress, query)
      return queryResponse.owner
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async operators(contractAddress: string): Promise<string[]> {
    const query = {
      andr_query: {
        operators: {},
      },
    }

    try {
      const queryResponse = await this.lcdService.wasm.contractQuery<AndrQuery>(contractAddress, query)
      return queryResponse.operators
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async isOperator(contractAddress: string, operatorAddress: string): Promise<boolean> {
    const query = {
      andr_query: {
        is_operator: {
          address: operatorAddress,
        },
      },
    }

    try {
      const queryResponse = await this.lcdService.wasm.contractQuery<AndrQuery>(contractAddress, query)
      return queryResponse.isOperator ?? false
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
