import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { MissionAdoService } from './mission-ado.service'
import { MissionComponent, MissionConfig, MissionQuery } from './types'

@Resolver(MissionQuery)
export class MissionAdoResolver {
  constructor(private readonly missionAdoService: MissionAdoService) {}

  @Query(() => MissionQuery)
  public async mission(@Args('contractAddress') contractAddress: string): Promise<MissionQuery> {
    return { contractAddress: contractAddress } as MissionQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() mission: MissionQuery): Promise<string> {
    return this.missionAdoService.owner(mission.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() mission: MissionQuery): Promise<string[]> {
    return this.missionAdoService.operators(mission.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() mission: MissionQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.missionAdoService.isOperator(mission.contractAddress, operatorAddress)
  }

  @ResolveField(() => [String])
  public async getAddresses(@Parent() mission: MissionQuery): Promise<string[]> {
    return this.missionAdoService.getAddresses(mission.contractAddress)
  }

  @ResolveField(() => String)
  public async getAddress(@Parent() mission: MissionQuery, @Args('name') name: string): Promise<string> {
    return this.missionAdoService.getAddress(mission.contractAddress, name)
  }

  @ResolveField(() => [MissionComponent])
  public async getComponents(@Parent() mission: MissionQuery): Promise<MissionComponent[]> {
    return this.missionAdoService.getComponents(mission.contractAddress)
  }

  @ResolveField(() => MissionConfig)
  public async config(@Parent() mission: MissionQuery): Promise<MissionConfig> {
    return this.missionAdoService.config(mission.contractAddress)
  }
}
