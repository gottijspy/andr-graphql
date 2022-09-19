import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoType } from 'src/ado/types/ado.enums'
import { AppService } from 'src/app/app.service'
import { AppComponent } from 'src/app/types'
import { CW721Service } from 'src/cw721/cw721.service'
import { AttributeSearchOptions, NftInfo } from 'src/cw721/types'
import { AssetsService } from './assets.service'
import { AssetFilterArgs, AssetResult } from './types'

@Resolver(AssetResult)
export class AssetsResolver {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly appService: AppService,
    private readonly cw721Service: CW721Service,
  ) {}

  @Query(() => [AssetResult])
  public async assets(
    @Args('walletAddress') walletAddress: string,
    @Args() filter: AssetFilterArgs,
  ): Promise<AssetResult[]> {
    return this.assetsService.getAssets(walletAddress, filter.limit, filter.offset, filter.adoType)
  }

  @ResolveField(() => [AppComponent])
  public async components(@Parent() asset: AssetResult): Promise<AppComponent[]> {
    if (asset.adoType !== AdoType.App) return []

    const [components, addresses] = await Promise.all([
      this.appService.getComponents(asset.address),
      this.appService.getAddresses(asset.address),
    ])
    //const componentAddresses = await this.appService.getAddresses(ado.address);
    return components.map((item) => {
      const componentAddress = addresses.find((addr) => addr.name == item.name)
      if (componentAddress) item.address = componentAddress.address
      return item
    })
  }

  @ResolveField(() => [NftInfo])
  public async tokens(@Parent() asset: AssetResult, @Args() filters?: AttributeSearchOptions): Promise<NftInfo[]> {
    if (asset.adoType !== AdoType.CW721) return []
    return this.cw721Service.searchTokens(asset.address, filters?.attributes)
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
