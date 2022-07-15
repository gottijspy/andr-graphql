import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, Splitter, SplitterContract, SplitterContractResult, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { SplitterAdoService } from './splitter.service'

@Resolver(SplitterContract)
export class SplitterAdoResolver {
  constructor(private readonly splitterAdoService: SplitterAdoService) {}

  @Query(() => SplitterContractResult)
  public async splitter(@Args('address') address: string): Promise<typeof SplitterContractResult> {
    const contractInfo = await this.splitterAdoService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Splitter) {
      return contractInfo as SplitterContract
    }

    const typeError = new TypeMismatchError(AdoType.Splitter, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() splitter: SplitterContract): Promise<string> {
    return this.splitterAdoService.owner(splitter.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() splitter: SplitterContract): Promise<string[]> {
    return this.splitterAdoService.operators(splitter.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() splitter: SplitterContract, @Args('operator') operator: string): Promise<boolean> {
    return this.splitterAdoService.isOperator(splitter.address, operator)
  }

  @ResolveField(() => Splitter)
  public async config(@Parent() splitter: SplitterContract): Promise<Splitter> {
    return this.splitterAdoService.config(splitter.address)
  }
}
