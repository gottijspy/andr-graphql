import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApolloError, UserInputError } from 'apollo-server'
import { Model } from 'mongoose'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { DEFAULT_CATCH_ERR, MONGO_QUERY_ERROR } from 'src/ado/types'
import { ChainConfig, NOT_FOUND_ERR } from './types'

@Injectable()
export class ChainConfigService {
  constructor(
    @InjectPinoLogger(ChainConfigService.name)
    protected readonly logger: PinoLogger,
    @InjectModel(ChainConfig.name)
    private chainConfigModel?: Model<ChainConfig>,
  ) {}

  public async getConfig(identifier: string): Promise<ChainConfig> {
    try {
      const chainConfig = await this.chainConfigModel?.findOne({ $or: [{ chainId: identifier }, { name: identifier }] })
      if (!chainConfig) throw new UserInputError(NOT_FOUND_ERR)

      return chainConfig
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, identifier)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR, identifier)
    }
  }
}
