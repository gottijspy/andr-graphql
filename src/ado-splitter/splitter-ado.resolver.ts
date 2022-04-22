import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { SplitterAdoService } from './splitter-ado.service'
import { Splitter, SplitterQuery } from './types'

@Resolver(SplitterQuery)
export class SplitterAdoResolver {
  constructor(private readonly splitterAdoService: SplitterAdoService) {}

  @Query(() => SplitterQuery)
  public async splitter(@Args('contractAddress') contractAddress: string): Promise<SplitterQuery> {
    return { contractAddress: contractAddress } as SplitterQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() splitter: SplitterQuery): Promise<string> {
    return this.splitterAdoService.owner(splitter.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() splitter: SplitterQuery): Promise<string[]> {
    return this.splitterAdoService.operators(splitter.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() splitter: SplitterQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.splitterAdoService.isOperator(splitter.contractAddress, operatorAddress)
  }

  @ResolveField(() => Splitter)
  public async config(@Parent() splitter: SplitterQuery): Promise<Splitter> {
    return this.splitterAdoService.config(splitter.contractAddress)
  }
}
