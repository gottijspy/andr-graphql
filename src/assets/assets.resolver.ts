import { Args, Query, Resolver } from '@nestjs/graphql'
import { Ado } from 'src/ado/types/ado.schema'
import { AssetsService } from './assets.service'
import { PaginationArgs } from './types/assets.result'

@Resolver(Ado)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [Ado])
  public async assets(@Args('walletAddress') walletAddress: string, @Args() filter: PaginationArgs): Promise<Ado[]> {
    return this.assetsService.getIndexedAdos(walletAddress, filter.limit, filter.offset)
  }

  // @ResolveField(() => String)
  // public async timestamp(@Parent() asset: AssetResult): Promise<string | undefined> {
  //   if (!asset.height) return
  //   return this.assetsService.getTimestamp(asset.height)
  // }

  // @ResolveField(() => AssetInfoResult)
  // public async assetInfo(@Parent() asset: Ado): Promise<typeof AssetInfoResult> {
  //   if (asset.adoType === AdoType[AdoType.App].toLowerCase()) {
  //     console.log('app is true')
  //     return { address: asset.contractAddress } as AdoAppContract
  //   }

  //   return { address: asset.contractAddress } as AdoContract
  // }
}
