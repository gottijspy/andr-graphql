import { Args, Query, Resolver } from '@nestjs/graphql'
import { ChainConfigService } from './chain-config.service'
import { ChainConfig } from './types'

@Resolver(ChainConfig)
export class ChainConfigResolver {
  constructor(private readonly chainConfigService: ChainConfigService) {}

  @Query(() => ChainConfig)
  public async chainConfig(@Args('identifier') identifier: string) {
    return this.chainConfigService.getConfig(identifier)
  }
}
