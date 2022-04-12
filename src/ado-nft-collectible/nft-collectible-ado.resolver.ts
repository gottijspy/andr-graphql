import { Query, Resolver } from '@nestjs/graphql'
import { NftCollectibleAdo } from './models'
import { NftCollectibleAdoService } from './nft-collectible-ado.service'

@Resolver(NftCollectibleAdo)
export class NftCollectibleAdoResolver {
  constructor(private readonly nftCollectibleAdoService: NftCollectibleAdoService) {}

  @Query(() => NftCollectibleAdo)
  public async nftcollectible(): Promise<NftCollectibleAdo> {
    return this.nftCollectibleAdoService.instance()
  }

  // @ResolveField(() => String)
  // public async primitiveContract(@Args('address') address: string): Promise<string> {
  //   return await this.tokenAdoService.primitiveContract(address);
  // }

  // @ResolveField(() => AdoSearchResult)
  // public async search(@Args('options') options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   return this.adoService.search(options)
  // }
}
