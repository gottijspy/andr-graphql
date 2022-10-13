import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ChainConfigService } from './chain-config.service'
import { ChainConfig, ChainConfigQuery } from './types'

@Resolver(ChainConfigQuery)
export class ChainConfigResolver {
  constructor(private readonly chainConfigService: ChainConfigService) {}

  @Query(() => ChainConfigQuery)
  public async chainConfigs(): Promise<ChainConfigQuery> {
    return {} as ChainConfigQuery
  }

  @ResolveField(() => [ChainConfig])
  public async allConfigs(): Promise<ChainConfig[]> {
    return this.chainConfigService.getAllConfigs()
  }

  @ResolveField(() => ChainConfig)
  public async config(@Args('identifier') identifier: string): Promise<ChainConfig> {
    return this.chainConfigService.getConfig(identifier)
  }
}
