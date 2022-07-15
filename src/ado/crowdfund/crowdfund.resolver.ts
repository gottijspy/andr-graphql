import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CrowdfundConfig, CrowdfundContract, CrowdfundState } from 'src/ado/types'
import { CrowdfundContractResult, TypeMismatchError, AdoContractError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { CrowdfundAdoService } from './crowdfund.service'

@Resolver(CrowdfundContract)
export class CrowdfundAdoResolver {
  constructor(private readonly crowdfundAdoService: CrowdfundAdoService) {}

  @Query(() => CrowdfundContractResult)
  public async crowdfund(@Args('address') address: string): Promise<typeof CrowdfundContractResult> {
    const contractInfo = await this.crowdfundAdoService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Crowdfund) {
      return contractInfo as CrowdfundContract
    }

    const typeError = new TypeMismatchError(AdoType.Crowdfund, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() crowdfund: CrowdfundContract): Promise<string> {
    return this.crowdfundAdoService.owner(crowdfund.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() crowdfund: CrowdfundContract): Promise<string[]> {
    return this.crowdfundAdoService.operators(crowdfund.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() crowdfund: CrowdfundContract,
    @Args('operator') operator: string,
  ): Promise<boolean> {
    return this.crowdfundAdoService.isOperator(crowdfund.address, operator)
  }

  @ResolveField(() => CrowdfundState)
  public async state(@Parent() crowdfund: CrowdfundContract): Promise<CrowdfundState> {
    return this.crowdfundAdoService.state(crowdfund.address)
  }

  @ResolveField(() => CrowdfundConfig)
  public async config(@Parent() crowdfund: CrowdfundContract): Promise<CrowdfundConfig> {
    return this.crowdfundAdoService.config(crowdfund.address)
  }

  @ResolveField(() => [String])
  public async availableTokens(@Parent() crowdfund: CrowdfundContract): Promise<string[]> {
    return this.crowdfundAdoService.availableTokens(crowdfund.address)
  }

  @ResolveField(() => Boolean)
  public async isTokenAvailable(
    @Parent() crowdfund: CrowdfundContract,
    @Args('tokenId') tokenId: string,
  ): Promise<boolean> {
    return this.crowdfundAdoService.isTokenAvailable(crowdfund.address, tokenId)
  }
}
