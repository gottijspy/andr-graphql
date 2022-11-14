import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApolloError, UserInputError } from 'apollo-server'
import { Model } from 'mongoose'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { DEFAULT_CATCH_ERR, MONGO_QUERY_ERROR } from 'src/ado/andr-query/types'
import { KEPLR_CONFIGS_NOT_FOUND_ERR, KEPLR_CONFIG_NOT_FOUND_ERR, KeplrConfig } from './types'

@Injectable()
export class KeplrConfigService {
  constructor(
    @InjectPinoLogger(KeplrConfigService.name)
    protected readonly logger: PinoLogger,
    @InjectModel(KeplrConfig.name)
    private keplrConfigModel?: Model<KeplrConfig>,
  ) {}

  public async getAllConfigs(): Promise<KeplrConfig[]> {
    try {
      const keplrConfigs = await this.keplrConfigModel?.find()
      if (!keplrConfigs || !keplrConfigs.length) throw new UserInputError(KEPLR_CONFIGS_NOT_FOUND_ERR)

      return keplrConfigs
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR)
    }
  }

  public async getConfig(identifier: string): Promise<KeplrConfig> {
    try {
      const keplrConfig = await this.keplrConfigModel?.findOne({ chainId: identifier })
      if (!keplrConfig) throw new UserInputError(KEPLR_CONFIG_NOT_FOUND_ERR)

      return keplrConfig
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, identifier)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR, identifier)
    }
  }
}
