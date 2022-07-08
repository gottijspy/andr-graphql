import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PrimitiveAdoService } from './primitive.service'
import { PrimitiveResponse } from './types'
import { PrimitiveQuery } from './types/primitive.query'

@Resolver(PrimitiveQuery)
export class PrimitiveAdoResolver {
  constructor(private readonly primitiveAdoService: PrimitiveAdoService) {}

  @Query(() => PrimitiveQuery)
  public async primitive(@Args('contractAddress') contractAddress: string): Promise<PrimitiveQuery> {
    return { contractAddress: contractAddress } as PrimitiveQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() primitive: PrimitiveQuery): Promise<string> {
    return this.primitiveAdoService.owner(primitive.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() primitive: PrimitiveQuery): Promise<string[]> {
    return this.primitiveAdoService.operators(primitive.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() primitive: PrimitiveQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.primitiveAdoService.isOperator(primitive.contractAddress, operatorAddress)
  }

  @ResolveField(() => PrimitiveResponse)
  public async getValue(@Parent() primitive: PrimitiveQuery, @Args('key') key: string): Promise<PrimitiveResponse> {
    return this.primitiveAdoService.getValue(primitive.contractAddress, key)
  }
}
