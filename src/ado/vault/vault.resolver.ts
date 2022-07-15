import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, AndrStrategy, TypeMismatchError, VaultContract, VaultContractResult } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AndrCoin } from '../common/types'
import { VaultAdoService } from './vault.service'

@Resolver(VaultContract)
export class VaultAdoResolver {
  constructor(private readonly vaultAdoService: VaultAdoService) {}

  @Query(() => VaultContractResult)
  public async vault(@Args('address') address: string): Promise<typeof VaultContractResult> {
    const contractInfo = await this.vaultAdoService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Vault) {
      return contractInfo as VaultContract
    }

    const typeError = new TypeMismatchError(AdoType.Vault, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() vault: VaultContract): Promise<string> {
    return this.vaultAdoService.owner(vault.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() vault: VaultContract): Promise<string[]> {
    return this.vaultAdoService.operators(vault.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() vault: VaultContract, @Args('operator') operator: string): Promise<boolean> {
    return this.vaultAdoService.isOperator(vault.address, operator)
  }

  @ResolveField(() => [AndrCoin])
  public async balance(@Parent() vault: VaultContract, @Args('address') address: string): Promise<AndrCoin[]> {
    return this.vaultAdoService.balance(vault.address, address)
  }

  //FIX Invalid Strategy (anchor)
  @ResolveField(() => AndrStrategy)
  public async strategyAddress(
    @Parent() vault: VaultContract,
    @Args('strategy') strategy: string,
  ): Promise<AndrStrategy> {
    return this.vaultAdoService.strategyAddress(vault.address, strategy)
  }
}
