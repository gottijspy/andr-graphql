import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { KeplrConfigResolver } from './keplr-config.resolver'
import { KeplrConfigService } from './keplr-config.service'
import { KeplrConfig } from './types'
import { KeplrConfigSchema } from './types/keplr-config.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: KeplrConfig.name, schema: KeplrConfigSchema }])],
  providers: [KeplrConfigResolver, KeplrConfigService],
})
export class KeplrConfigModule {}
