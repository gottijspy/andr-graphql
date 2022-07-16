import { Args, Query, Resolver } from '@nestjs/graphql'
import { AdoResolver } from '../ado.resolver'
import { AdoContractError, AnchorContract, AnchorResult, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AnchorService } from './anchor.service'

@Resolver(AnchorContract)
export class AnchorResolver extends AdoResolver {
  constructor(private readonly anchorService: AnchorService) {
    super(anchorService)
  }

  @Query(() => AnchorResult)
  public async anchor(@Args('address') address: string): Promise<typeof AnchorResult> {
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
}
