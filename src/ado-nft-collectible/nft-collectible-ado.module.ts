import { Module } from '@nestjs/common'
import { NftCollectibleAdoResolver } from './nft-collectible-ado.resolver'
import { NftCollectibleAdoService } from './nft-collectible-ado.service'

@Module({
  providers: [NftCollectibleAdoResolver, NftCollectibleAdoService],
})
export class NftCollectibleAdoModule {}
