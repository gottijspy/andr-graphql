import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { KeplrConfigService } from './keplr-config.service'
import { KeplrConfig, KeplrConfigQuery } from './types'

@Resolver(KeplrConfigQuery)
export class KeplrConfigResolver {
  constructor(private readonly keplrConfigService: KeplrConfigService) {}

  @Query(() => KeplrConfigQuery)
  public async keplrConfigs(): Promise<KeplrConfigQuery> {
    return {} as KeplrConfigQuery
  }

  @ResolveField(() => [KeplrConfig])
  public async allConfigs(): Promise<KeplrConfig[]> {
    return this.keplrConfigService.getAllConfigs()
  }

  @ResolveField(() => KeplrConfig)
  public async config(@Args('identifier') identifier: string): Promise<KeplrConfig> {
    return this.keplrConfigService.getConfig(identifier)
  }
}
