import { Module } from '@nestjs/common'
import { NftCollectibleAdoResolver } from './nft.resolver'
import { NftCollectibleAdoService } from './nft.service'

@Module({
  providers: [NftCollectibleAdoResolver, NftCollectibleAdoService],
})
export class NftCollectibleAdoModule {}
