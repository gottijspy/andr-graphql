import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, Escrow, TimelockContract, TimelockContractResult, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AndrSearchOptions } from '../types/andr-search-options.input'
import { TimelockService } from './timelock.service'

@Resolver(TimelockContract)
export class TimelockResolver {
  constructor(private readonly timelockService: TimelockService) {}

  @Query(() => TimelockContractResult)
  public async timelock(@Args('address') address: string): Promise<typeof TimelockContractResult> {
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

  @ResolveField(() => String)
  public async owner(@Parent() timelock: TimelockContract): Promise<string> {
    return this.timelockService.owner(timelock.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() timelock: TimelockContract): Promise<string[]> {
    return this.timelockService.operators(timelock.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() timelock: TimelockContract, @Args('operator') operator: string): Promise<boolean> {
    return this.timelockService.isOperator(timelock.address, operator)
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
