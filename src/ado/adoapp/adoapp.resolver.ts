import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  AppComponent,
  AppComponentAddress,
  AppConfig,
  AdoAppContract,
  AdoContractError,
  TypeMismatchError,
  AdoAppResult,
} from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { AdoAppService } from './adoapp.service'

@Resolver(AdoAppContract)
export class AdoAppResolver extends AdoResolver {
  constructor(private readonly adoAppService: AdoAppService) {
    super(adoAppService)
  }

  @Query(() => AdoAppResult)
  public async app(@Args('address') address: string): Promise<typeof AdoAppResult> {
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
