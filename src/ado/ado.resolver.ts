import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql'
import { AdoService } from './ado.service'
import { AdoContract } from './types/ado.contract'

@Resolver(AdoContract)
export class AdoResolver {
  constructor(private readonly adoService: AdoService) {}

  @Query(() => AdoContract)
  public async ado(@Args('address') address: string): Promise<AdoContract> {
    return this.adoService.getContract(address)
  }

  @ResolveField(() => String)
  public async owner(@Parent() ado: AdoContract): Promise<string> {
    return this.adoService.owner(ado.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() ado: AdoContract): Promise<string[]> {
    return this.adoService.operators(ado.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() ado: AdoContract, @Args('operator') operator: string): Promise<boolean> {
    return this.adoService.isOperator(ado.address, operator)
  }
}
