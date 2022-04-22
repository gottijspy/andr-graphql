import { Module } from '@nestjs/common'
import { RatesAdoResolver } from './rates.resolver'
import { RatesAdoService } from './rates.service'

@Module({
  providers: [RatesAdoResolver, RatesAdoService],
})
export class RatesAdoModule {}
