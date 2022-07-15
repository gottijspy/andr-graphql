import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { NftCollectibleAdoResolver } from './nft.resolver'
import { NftCollectibleAdoService } from './nft.service'

@Module({
  imports: [WasmModule],
  providers: [NftCollectibleAdoResolver, NftCollectibleAdoService],
})
export class NftCollectibleAdoModule {}
