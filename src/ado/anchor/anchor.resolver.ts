import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, AnchorContract, AnchorContractResult, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AnchorService } from './anchor.service'

@Resolver(AnchorContract)
export class AnchorResolver {
  constructor(private readonly anchorService: AnchorService) {}

  @Query(() => AnchorContractResult)
  public async anchor(@Args('address') address: string): Promise<typeof AnchorContractResult> {
    const contractInfo = await this.anchorService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Anchor) {
      return contractInfo as AnchorContract
    }

    const typeError = new TypeMismatchError(AdoType.Anchor, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() anchor: AnchorContract): Promise<string> {
    return this.anchorService.owner(anchor.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() anchor: AnchorContract): Promise<string[]> {
    return this.anchorService.operators(anchor.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() anchor: AnchorContract, @Args('operator') operator: string): Promise<boolean> {
    return this.anchorService.isOperator(anchor.address, operator)
  }
}
