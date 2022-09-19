import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoType } from 'src/ado/types/ado.enums'
import { AppComponent, AppComponentAddress, AppConfig, AppContract } from 'src/app/types'
import { AdoResolver } from '../ado/ado.resolver'
import { TypeMismatchError } from '../ado/types'
import { AppService } from './app.service'

@Resolver(AppContract)
export class AppResolver extends AdoResolver {
  constructor(private readonly appService: AppService) {
    super(appService)
  }

  @Query(() => AppContract)
  public async app(@Args('address') address: string): Promise<AppContract> {
    const contractInfo = await this.appService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType === AdoType.App) {
      return contractInfo as AppContract
    }

    const typeError = new TypeMismatchError(AdoType.App, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => AppConfig)
  public async config(@Parent() app: AppContract): Promise<AppConfig> {
    return this.appService.config(app.address)
  }

  @ResolveField(() => [AppComponentAddress])
  public async addresses(@Parent() app: AppContract): Promise<AppComponentAddress[]> {
    return this.appService.getAddresses(app.address)
  }

  @ResolveField(() => String)
  public async getAddress(@Parent() app: AppContract, @Args('name') name: string): Promise<string> {
    return this.appService.getAddress(app.address, name)
  }

  @ResolveField(() => Boolean)
  public async componentExists(@Parent() app: AppContract, @Args('name') name: string): Promise<boolean> {
    return this.appService.componentExists(app.address, name)
  }

  @ResolveField(() => [AppComponent])
  public async components(@Parent() app: AppContract): Promise<AppComponent[]> {
    return this.appService.getComponents(app.address)
  }
}
