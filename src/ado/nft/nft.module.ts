import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { NftResolver } from './nft.resolver'
import { NftService } from './nft.service'

@Module({
  imports: [WasmModule],
  providers: [NftResolver, NftService],
})
export class NftModule {}
