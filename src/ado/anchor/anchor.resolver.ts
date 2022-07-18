import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoResolver } from '../ado.resolver'
import { AnchorContract, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AnchorService } from './anchor.service'

@Resolver(AnchorContract)
export class AnchorResolver extends AdoResolver {
  constructor(private readonly anchorService: AnchorService) {
    super(anchorService)
  }

  @Query(() => AnchorContract)
  public async anchor(@Args('address') address: string): Promise<AnchorContract> {
    const contractInfo = await this.anchorService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.Anchor) {
      return contractInfo as AnchorContract
    }

    const typeError = new TypeMismatchError(AdoType.Anchor, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }
}
