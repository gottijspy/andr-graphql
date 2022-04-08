import { Module } from '@nestjs/common'
import { AuctionAdoResolver } from './auction-ado.resolver'
import { AuctionAdoService } from './auction-ado.service'

@Module({
  providers: [AuctionAdoResolver, AuctionAdoService],
})
export class AuctionAdoModule {}
