import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AuctionResolver } from './auction.resolver'
import { AuctionService } from './auction.service'

@Module({
  imports: [WasmModule],
  providers: [AuctionResolver, AuctionService],
})
export class AuctionModule {}
