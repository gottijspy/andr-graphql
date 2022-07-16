import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoResolver } from '../ado.resolver'
import { AdoContractError, Escrow, TimelockContract, TimelockResult, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AndrSearchOptions } from '../types/andr-search-options.input'
import { TimelockService } from './timelock.service'

@Resolver(TimelockContract)
export class TimelockResolver extends AdoResolver {
  constructor(private readonly timelockService: TimelockService) {
    super(timelockService)
  }

  @Query(() => TimelockResult)
  public async timelock(@Args('address') address: string): Promise<typeof TimelockResult> {
    const contractInfo = await this.timelockService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Timelock) {
      return contractInfo as TimelockContract
    }

    const typeError = new TypeMismatchError(AdoType.Timelock, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => Escrow)
  public async getLockedFunds(
    @Parent() timelock: TimelockContract,
    @Args('owner') owner: string,
    @Args('recipient') recipient: string,
  ): Promise<Escrow> {
    return this.timelockService.getLockedFunds(timelock.address, owner, recipient)
  }

  @ResolveField(() => [Escrow])
  public async getLockedFundsForRecipient(
    @Parent() timelock: TimelockContract,
    @Args('recipient') recipient: string,
    @Args('options') options?: AndrSearchOptions,
  ): Promise<Escrow[]> {
    return [] as Escrow[]
  }
}
