import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoType } from 'src/ado/types/ado.enums'
import { AppComponent } from 'src/app/types'
import { AssetsService } from './assets.service'
import { AssetFilterArgs, AppComponentFilterArgs, AssetResult } from './types'

@Resolver(AssetResult)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [AssetResult])
  public async assets(
    @Args('walletAddress') walletAddress: string,
    @Args() filter: AssetFilterArgs,
  ): Promise<AssetResult[]> {
    return this.assetsService.getAssets(walletAddress, filter.limit, filter.offset, filter.adoType)
  }

  @ResolveField(() => [AppComponent])
  public async components(
    @Parent() asset: AssetResult,
    @Args() filter?: AppComponentFilterArgs,
  ): Promise<AppComponent[]> {
    if (asset.adoType !== AdoType.App) return []
    const components = await this.assetsService.getComponents(asset.address, asset.chainId, filter?.componentType)
    return components
  }

  // @ResolveField(() => [NftInfo])
  // public async tokens(@Parent() asset: AssetResult, @Args() filters?: AttributeSearchOptions): Promise<NftInfo[]> {
  //   if (!(asset.adoType === AdoType.CW721 || asset.adoType === AdoType.App)) return []
  //   return this.assetsService.getTokens(asset.address, asset.adoType)
  // }

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
