import { Module } from '@nestjs/common'
import { OffersAdoResolver } from './offers.resolver'
import { OffersAdoService } from './offers.service'

@Module({
  providers: [OffersAdoResolver, OffersAdoService],
})
export class AdoOffersModule {}
