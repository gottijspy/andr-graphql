import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdoPackageResolver } from './ado-package.resolver'
import { AdoPackageService } from './ado-package.service'
import { AdoPackage } from './types'
import { AdoPackageSchema } from './types/ado-package.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: AdoPackage.name, schema: AdoPackageSchema }])],
  providers: [AdoPackageResolver, AdoPackageService],
})
export class AdoPackageModule {}
