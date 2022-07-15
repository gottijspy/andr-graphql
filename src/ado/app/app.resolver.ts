import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AppContract, AdoContractError, TypeMismatchError, AppContractResult } from 'src/ado/types'
import { AppComponent, AppComponentAddress, AppConfig } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoAppService } from './app.service'

@Resolver(AppContract)
export class AdoAppResolver {
  constructor(private readonly adoAppService: AdoAppService) {}

  @Query(() => AppContractResult)
  public async app(@Args('address') address: string): Promise<typeof AppContractResult> {
    const contractInfo = await this.adoAppService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.App) {
      return contractInfo as AppContract
    }

    const typeError = new TypeMismatchError(AdoType.App, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() app: AppContract): Promise<string> {
    return this.adoAppService.owner(app.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() app: AppContract): Promise<string[]> {
    return this.adoAppService.operators(app.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() app: AppContract, @Args('operator') operator: string): Promise<boolean> {
    return this.adoAppService.isOperator(app.address, operator)
  }

  @ResolveField(() => AppConfig)
  public async config(@Parent() app: AppContract): Promise<AppConfig> {
    return this.adoAppService.config(app.address)
  }

  @ResolveField(() => [AppComponentAddress])
  public async addresses(@Parent() app: AppContract): Promise<AppComponentAddress[]> {
    return this.adoAppService.getAddresses(app.address)
  }

  @ResolveField(() => String)
  public async getAddress(@Parent() app: AppContract, @Args('name') name: string): Promise<string> {
    return this.adoAppService.getAddress(app.address, name)
  }

  @ResolveField(() => Boolean)
  public async componentExists(@Parent() app: AppContract, @Args('name') name: string): Promise<boolean> {
    return this.adoAppService.componentExists(app.address, name)
  }

  @ResolveField(() => [AppComponent])
  public async components(@Parent() app: AppContract): Promise<AppComponent[]> {
    return this.adoAppService.getComponents(app.address)
  }
}
