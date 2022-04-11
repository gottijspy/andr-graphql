import { Module } from '@nestjs/common'
import { OffersAdoResolver } from './offers-ado.resolver'
import { OffersAdoService } from './offers-ado.service'

@Module({
  providers: [OffersAdoResolver, OffersAdoService],
})
export class AdoOffersModule {}
