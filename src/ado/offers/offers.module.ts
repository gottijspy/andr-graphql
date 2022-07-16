import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { OffersResolver } from './offers.resolver'
import { OffersService } from './offers.service'

@Module({
  imports: [WasmModule],
  providers: [OffersResolver, OffersService],
})
export class AdoOffersModule {}
