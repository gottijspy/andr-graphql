import { Module } from '@nestjs/common'
import { AdoAppResolver } from './app.resolver'
import { AdoAppService } from './app.service'

@Module({
  providers: [AdoAppResolver, AdoAppService],
})
export class AppAdoModule {}
