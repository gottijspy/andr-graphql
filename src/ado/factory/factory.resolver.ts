import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoResolver } from '../ado.resolver'
import { FactoryContract, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { FactoryService } from './factory.service'

@Resolver(FactoryContract)
export class FactoryResolver extends AdoResolver {
  constructor(private readonly factoryService: FactoryService) {
    super(factoryService)
  }

  @Query(() => FactoryContract)
  public async factoty(@Args('address') address: string): Promise<FactoryContract> {
    const contractInfo = await this.factoryService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.Factory) {
      return contractInfo as FactoryContract
    }

    const typeError = new TypeMismatchError(AdoType.Factory, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => Int)
  public async code_id(@Parent() factory: FactoryContract, @Args('key') key: string): Promise<number> {
    return this.factoryService.getCodeId(factory.address, key)
  }
}
