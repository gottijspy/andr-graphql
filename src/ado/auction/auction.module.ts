import { Module } from '@nestjs/common'
import { AuctionAdoResolver } from './auction.resolver'
import { AuctionAdoService } from './auction.service'

@Module({
  providers: [AuctionAdoResolver, AuctionAdoService],
})
export class AuctionAdoModule {}
