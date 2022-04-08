import { Module } from '@nestjs/common'
import { RatesAdoResolver } from './rates-ado.resolver'
import { RatesAdoService } from './rates-ado.service'

@Module({
  providers: [RatesAdoResolver, RatesAdoService],
})
export class RatesAdoModule {}
