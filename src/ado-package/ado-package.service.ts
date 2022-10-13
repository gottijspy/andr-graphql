import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApolloError, UserInputError } from 'apollo-server'
import { Model } from 'mongoose'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AdoType, DEFAULT_CATCH_ERR, MONGO_QUERY_ERROR } from 'src/ado/types'
import { AdoPackage, ADO_TYPES_NOT_FOUND_ERR, ADO_TYPE_NOT_FOUND_ERR } from './types'

@Injectable()
export class AdoPackageService {
  constructor(
    @InjectPinoLogger(AdoPackageService.name)
    protected readonly logger: PinoLogger,
    @InjectModel(AdoPackage.name)
    private adoPackageModel?: Model<AdoPackage>,
  ) {}

  public async getAdoTypes(): Promise<string[]> {
    try {
      const packages = await this.adoPackageModel?.find({}, { name: 1, _id: 0 })
      if (!packages || !packages.length) throw new UserInputError(ADO_TYPES_NOT_FOUND_ERR)

      return packages.map((p) => p.name)
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR)
    }
  }

  public async getPackage(adoType: AdoType): Promise<AdoPackage> {
    try {
      const adoPackage = await this.adoPackageModel?.findOne({ name: adoType })
      if (!adoPackage) throw new UserInputError(ADO_TYPE_NOT_FOUND_ERR)

      return adoPackage
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, adoType)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR, adoType)
    }
  }
}
