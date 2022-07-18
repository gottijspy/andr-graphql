import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { Splitter, SplitterContract, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { SplitterService } from './splitter.service'

@Resolver(SplitterContract)
export class SplitterResolver extends AdoResolver {
  constructor(private readonly splitterService: SplitterService) {
    super(splitterService)
  }

  @Query(() => SplitterContract)
  public async splitter(@Args('address') address: string): Promise<SplitterContract> {
    const contractInfo = await this.splitterService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.Splitter) {
      return contractInfo as SplitterContract
    }

    const typeError = new TypeMismatchError(AdoType.Splitter, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => Splitter)
  public async config(@Parent() splitter: SplitterContract): Promise<Splitter> {
    return this.splitterService.config(splitter.address)
  }
}
