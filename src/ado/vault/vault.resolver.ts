import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, AndrStrategy, Coin, TypeMismatchError, VaultContract, VaultResult } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { VaultService } from './vault.service'

@Resolver(VaultContract)
export class VaultResolver extends AdoResolver {
  constructor(private readonly vaultService: VaultService) {
    super(vaultService)
  }

  @Query(() => VaultResult)
  public async vault(@Args('address') address: string): Promise<typeof VaultResult> {
    const contractInfo = await this.vaultService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Vault) {
      return contractInfo as VaultContract
    }

    const typeError = new TypeMismatchError(AdoType.Vault, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => [Coin])
  public async balance(@Parent() vault: VaultContract, @Args('address') address: string): Promise<Coin[]> {
    return this.vaultService.balance(vault.address, address)
  }

  //FIX Invalid Strategy (anchor)
  @ResolveField(() => AndrStrategy)
  public async strategyAddress(
    @Parent() vault: VaultContract,
    @Args('strategy') strategy: string,
  ): Promise<AndrStrategy> {
    return this.vaultService.strategyAddress(vault.address, strategy)
  }
}
