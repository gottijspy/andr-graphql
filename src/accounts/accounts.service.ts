import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApolloError, UserInputError } from 'apollo-server'
import { Model } from 'mongoose'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AdoType } from 'src/ado/andr-query/types'
import { Ado, AssetResult } from './assets/types'
import { DEFAULT_CATCH_ERR, MONGO_QUERY_ERROR } from './types'

@Injectable()
export class AccountsService {
  constructor(
    @InjectPinoLogger(AccountsService.name)
    protected readonly logger: PinoLogger,
    @InjectModel(Ado.name)
    private adoModel?: Model<Ado>,
  ) {}

  public async getAssets(owner: string, limit: number, offset: number, adoType?: AdoType): Promise<AssetResult[]> {
    try {
      const query: any = { owner: owner }
      if (adoType) {
        query.adoType = adoType
      }

      const ados = await this.adoModel?.find(query).limit(limit).skip(offset)
      if (!ados || !ados.length) return []

      return ados
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, owner)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR, owner)
    }
  }
}
