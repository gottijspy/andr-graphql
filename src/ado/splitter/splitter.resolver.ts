import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, Splitter, SplitterContract, SplitterResult, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { SplitterService } from './splitter.service'

@Resolver(SplitterContract)
export class SplitterResolver extends AdoResolver {
  constructor(private readonly splitterService: SplitterService) {
    super(splitterService)
  }

  @Query(() => SplitterResult)
  public async splitter(@Args('address') address: string): Promise<typeof SplitterResult> {
    const contractInfo = await this.splitterService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Splitter) {
      return contractInfo as SplitterContract
    }

    const typeError = new TypeMismatchError(AdoType.Splitter, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => Splitter)
  public async config(@Parent() splitter: SplitterContract): Promise<Splitter> {
    return this.splitterService.config(splitter.address)
  }
}
