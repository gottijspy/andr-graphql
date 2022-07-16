import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoAppContract, AdoContractError, TypeMismatchError, AdoAppContractResult } from 'src/ado/types'
import { AppComponent, AppComponentAddress, AppConfig } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoAppService } from './app.service'

@Resolver(AdoAppContract)
export class AdoAppResolver {
  constructor(private readonly adoAppService: AdoAppService) {}

  @Query(() => AdoAppContractResult)
  public async app(@Args('address') address: string): Promise<typeof AdoAppContractResult> {
    const contractInfo = await this.adoAppService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.App) {
      return contractInfo as AdoAppContract
    }

    const typeError = new TypeMismatchError(AdoType.App, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() app: AdoAppContract): Promise<string> {
    return this.adoAppService.owner(app.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() app: AdoAppContract): Promise<string[]> {
    return this.adoAppService.operators(app.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() app: AdoAppContract, @Args('operator') operator: string): Promise<boolean> {
    return this.adoAppService.isOperator(app.address, operator)
  }

  @ResolveField(() => AppConfig)
  public async config(@Parent() app: AdoAppContract): Promise<AppConfig> {
    return this.adoAppService.config(app.address)
  }

  @ResolveField(() => [AppComponentAddress])
  public async addresses(@Parent() app: AdoAppContract): Promise<AppComponentAddress[]> {
    return this.adoAppService.getAddresses(app.address)
  }

  @ResolveField(() => String)
  public async getAddress(@Parent() app: AdoAppContract, @Args('name') name: string): Promise<string> {
    return this.adoAppService.getAddress(app.address, name)
  }

  @ResolveField(() => Boolean)
  public async componentExists(@Parent() app: AdoAppContract, @Args('name') name: string): Promise<boolean> {
    return this.adoAppService.componentExists(app.address, name)
  }

  @ResolveField(() => [AppComponent])
  public async components(@Parent() app: AdoAppContract): Promise<AppComponent[]> {
    return this.adoAppService.getComponents(app.address)
  }
}
