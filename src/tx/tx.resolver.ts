import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TxService } from './tx.service'
import { TxFilterParams, TxSearchResult, TxInfo } from './types/tx.result'

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
  public async byContract(@Args('address') address: string, @Args() searchParams?: TxFilterParams): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byContract(address, searchParams)
    return queryInfo
  }

  @ResolveField(() => [TxInfo])
  public async byAccount(
    @Args('sentFromOrTo') sentFromOrTo: string,
    @Args() searchParams?: TxFilterParams,
  ): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byAccount(sentFromOrTo, searchParams)
    return queryInfo
  }

  @ResolveField(() => [TxInfo])
  public async byOwner(
    @Args('walletAddress') walletAddress: string,
    @Args() searchParams?: TxFilterParams,
  ): Promise<TxInfo[]> {
    const queryInfo = await this.txService.byOwner(walletAddress, searchParams)
    return queryInfo
  }
}
