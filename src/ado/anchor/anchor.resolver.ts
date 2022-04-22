import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AnchorAdoService } from './anchor.service'
import { AnchorQuery } from './types'

@Resolver(AnchorQuery)
export class AnchorAdoResolver {
  constructor(private readonly anchorAdoService: AnchorAdoService) {}

  @Query(() => AnchorQuery)
  public async anchor(@Args('contractAddress') contractAddress: string): Promise<AnchorQuery> {
    return { contractAddress: contractAddress } as AnchorQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() anchor: AnchorQuery): Promise<string> {
    return this.anchorAdoService.owner(anchor.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() anchor: AnchorQuery): Promise<string[]> {
    return this.anchorAdoService.operators(anchor.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() anchor: AnchorQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.anchorAdoService.isOperator(anchor.contractAddress, operatorAddress)
  }
}
