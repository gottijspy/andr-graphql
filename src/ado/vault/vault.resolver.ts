import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrCoin } from '../common/types'
import { AndrStrategy, VaultQuery } from './types'
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

  @ResolveField(() => [AndrCoin])
  public async balance(@Parent() vault: VaultQuery, @Args('address') address: string): Promise<AndrCoin[]> {
    return this.vaultAdoService.balance(vault.contractAddress, address)
  }

  //FIX Invalid Strategy (anchor)
  @ResolveField(() => AndrStrategy)
  public async strategyAddress(@Parent() vault: VaultQuery, @Args('strategy') strategy: string): Promise<AndrStrategy> {
    return this.vaultAdoService.strategyAddress(vault.contractAddress, strategy)
  }
}
