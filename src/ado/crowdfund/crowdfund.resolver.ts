import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CrowdfundConfig, CrowdfundContract, CrowdfundState } from 'src/ado/types'
import { CrowdfundResult, TypeMismatchError, AdoContractError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { CrowdfundService } from './crowdfund.service'

@Resolver(CrowdfundContract)
export class CrowdfundResolver extends AdoResolver {
  constructor(private readonly crowdfundService: CrowdfundService) {
    super(crowdfundService)
  }

  @Query(() => CrowdfundResult)
  public async crowdfund(@Args('address') address: string): Promise<typeof CrowdfundResult> {
    const contractInfo = await this.crowdfundService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Crowdfund) {
      return contractInfo as CrowdfundContract
    }

    const typeError = new TypeMismatchError(AdoType.Crowdfund, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => CrowdfundState)
  public async state(@Parent() crowdfund: CrowdfundContract): Promise<CrowdfundState> {
    return this.crowdfundService.state(crowdfund.address)
  }

  @ResolveField(() => CrowdfundConfig)
  public async config(@Parent() crowdfund: CrowdfundContract): Promise<CrowdfundConfig> {
    return this.crowdfundService.config(crowdfund.address)
  }

  @ResolveField(() => [String])
  public async availableTokens(@Parent() crowdfund: CrowdfundContract): Promise<string[]> {
    return this.crowdfundService.availableTokens(crowdfund.address)
  }

  @ResolveField(() => Boolean)
  public async isTokenAvailable(
    @Parent() crowdfund: CrowdfundContract,
    @Args('tokenId') tokenId: string,
  ): Promise<boolean> {
    return this.crowdfundService.isTokenAvailable(crowdfund.address, tokenId)
  }
}
