import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoResolver } from '../ado.resolver'
import { Escrow, TimelockContract, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AndrSearchOptions } from '../types/andr-search-options.input'
import { TimelockService } from './timelock.service'

@Resolver(TimelockContract)
export class TimelockResolver extends AdoResolver {
  constructor(private readonly timelockService: TimelockService) {
    super(timelockService)
  }

  @Query(() => TimelockContract)
  public async timelock(@Args('address') address: string): Promise<TimelockContract> {
    const contractInfo = await this.timelockService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.Timelock) {
      return contractInfo as TimelockContract
    }

    const typeError = new TypeMismatchError(AdoType.Timelock, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
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
