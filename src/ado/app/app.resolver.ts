import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoAppService } from './app.service'
import { AppComponent, AppComponentAddress, AppConfig, AppQuery } from './types'

@Resolver(AppQuery)
export class AdoAppResolver {
  constructor(private readonly adoAppService: AdoAppService) {}

  @Query(() => AppQuery)
  public async app(@Args('contractAddress') contractAddress: string): Promise<AppQuery> {
    return { contractAddress: contractAddress } as AppQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() app: AppQuery): Promise<string> {
    return this.adoAppService.owner(app.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() app: AppQuery): Promise<string[]> {
    return this.adoAppService.operators(app.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() app: AppQuery, @Args('operatorAddress') operatorAddress: string): Promise<boolean> {
    return this.adoAppService.isOperator(app.contractAddress, operatorAddress)
  }

  @ResolveField(() => [AppComponentAddress])
  public async getAddresses(@Parent() app: AppQuery): Promise<AppComponentAddress[]> {
    return this.adoAppService.getAddresses(app.contractAddress)
  }

  @ResolveField(() => String)
  public async getAddress(@Parent() app: AppQuery, @Args('name') name: string): Promise<string> {
    return this.adoAppService.getAddress(app.contractAddress, name)
  }

  @ResolveField(() => [AppComponent])
  public async getComponents(@Parent() app: AppQuery): Promise<AppComponent[]> {
    return this.adoAppService.getComponents(app.contractAddress)
  }

  @ResolveField(() => AppConfig)
  public async config(@Parent() app: AppQuery): Promise<AppConfig> {
    return this.adoAppService.config(app.contractAddress)
  }
}
