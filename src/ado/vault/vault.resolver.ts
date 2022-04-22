import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { VaultQuery } from './types'
import { VaultAdoService } from './vault.service'

@Resolver(VaultQuery)
export class VaultAdoResolver {
  constructor(private readonly vaultAdoService: VaultAdoService) {}

  @Query(() => VaultQuery)
  public async vault(@Args('contractAddress') contractAddress: string): Promise<VaultQuery> {
    return { contractAddress: contractAddress } as VaultQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() vault: VaultQuery): Promise<string> {
    return this.vaultAdoService.owner(vault.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() vault: VaultQuery): Promise<string[]> {
    return this.vaultAdoService.operators(vault.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() vault: VaultQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.vaultAdoService.isOperator(vault.contractAddress, operatorAddress)
  }
}
