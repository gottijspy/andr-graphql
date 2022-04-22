import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CrowdfundAdoService } from './crowdfund.service'
import { CrowdfundConfig, CrowdfundQuery, CrowdfundState } from './types'

@Resolver(CrowdfundQuery)
export class CrowdfundAdoResolver {
  constructor(private readonly crowdfundAdoService: CrowdfundAdoService) {}

  @Query(() => CrowdfundQuery)
  public async crowdfund(@Args('contractAddress') contractAddress: string): Promise<CrowdfundQuery> {
    return { contractAddress: contractAddress } as CrowdfundQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() crowdfund: CrowdfundQuery): Promise<string> {
    return this.crowdfundAdoService.owner(crowdfund.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() crowdfund: CrowdfundQuery): Promise<string[]> {
    return this.crowdfundAdoService.operators(crowdfund.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() crowdfund: CrowdfundQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.crowdfundAdoService.isOperator(crowdfund.contractAddress, operatorAddress)
  }

  @ResolveField(() => CrowdfundState)
  public async state(@Parent() crowdfund: CrowdfundQuery): Promise<CrowdfundState> {
    return this.crowdfundAdoService.state(crowdfund.contractAddress)
  }

  @ResolveField(() => CrowdfundConfig)
  public async config(@Parent() crowdfund: CrowdfundQuery): Promise<CrowdfundConfig> {
    return this.crowdfundAdoService.config(crowdfund.contractAddress)
  }
}
