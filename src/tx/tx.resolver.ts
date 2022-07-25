import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TxService } from './tx.service'
import { TxFilterParams, TxSearchResult, TxInfo, TxSearchByTagArgs } from './types/tx.result'

@Resolver(TxSearchResult)
export class TxResolver {
  constructor(private readonly txService: TxService) {}

  @Query(() => TxSearchResult)
  public async tx(): Promise<TxSearchResult> {
    return {} as TxSearchResult
  }

  @ResolveField(() => TxInfo)
  public async byHash(@Args('hash') hash: string): Promise<TxInfo> {
    const txInfo = this.txService.byHash(hash)
    return txInfo
  }

  @ResolveField(() => [TxInfo])
  public async byHeight(@Args('height') height: number): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byHeight(height)
    return queryInfo
  }

  @ResolveField(() => [TxInfo])
  public async byContract(@Args('address') address: string, @Args() filterParams?: TxFilterParams): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byContract(address, filterParams)
    return queryInfo
  }

  @ResolveField(() => [TxInfo])
  public async byAccount(
    @Args('sentFromOrTo') sentFromOrTo: string,
    @Args() filterParams?: TxFilterParams,
  ): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byAccount(sentFromOrTo, filterParams)
    return queryInfo
  }

  @ResolveField(() => [TxInfo])
  public async byOwner(
    @Args('walletAddress') walletAddress: string,
    @Args() filterParams?: TxFilterParams,
  ): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byOwner(walletAddress, filterParams)
    return queryInfo
  }

  @ResolveField(() => [TxInfo])
  public async byTag(@Args() searchTags: TxSearchByTagArgs, @Args() filterParams?: TxFilterParams): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byTag(searchTags, filterParams)
    return queryInfo
  }
}
