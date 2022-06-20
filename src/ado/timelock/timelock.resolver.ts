import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrSearchOptions } from '../common/models'
import { TimelockAdoService } from './timelock.service'
import { Escrow, TimelockQuery } from './types'

@Resolver(TimelockQuery)
export class TimelockAdoResolver {
  constructor(private readonly timelockAdoService: TimelockAdoService) {}

  @Query(() => TimelockQuery)
  public async timelock(@Args('contractAddress') contractAddress: string): Promise<TimelockQuery> {
    return { contractAddress: contractAddress } as TimelockQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() timelock: TimelockQuery): Promise<string> {
    return this.timelockAdoService.owner(timelock.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() timelock: TimelockQuery): Promise<string[]> {
    return this.timelockAdoService.operators(timelock.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() timelock: TimelockQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.timelockAdoService.isOperator(timelock.contractAddress, operatorAddress)
  }

  @ResolveField(() => Escrow)
  public async getLockedFunds(
    @Parent() timelock: TimelockQuery,
    @Args('owner') owner: string,
    @Args('recipient') recipient: string,
  ): Promise<Escrow> {
    return this.timelockAdoService.getLockedFunds(timelock.contractAddress, owner, recipient)
  }

  @ResolveField(() => [Escrow])
  public async getLockedFundsForRecipient(
    @Parent() timelock: TimelockQuery,
    @Args('recipient') recipient: string,
    @Args('options') options?: AndrSearchOptions,
  ): Promise<Escrow[]> {
    return [] as Escrow[]
  }
}
