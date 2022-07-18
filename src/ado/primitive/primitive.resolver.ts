import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { PrimitiveContract, PrimitiveResponse, TypeMismatchError } from 'src/ado/types'
import { AdoResolver } from '../ado.resolver'
import { AdoType } from '../types/ado.enums'
import { PrimitiveService } from './primitive.service'

@Resolver(PrimitiveContract)
export class PrimitiveResolver extends AdoResolver {
  constructor(private readonly primitiveService: PrimitiveService) {
    super(primitiveService)
  }

  @Query(() => PrimitiveContract)
  public async primitive(@Args('address') address: string): Promise<PrimitiveContract> {
    const contractInfo = await this.primitiveService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.Primitive) {
      return contractInfo as PrimitiveContract
    }

    const typeError = new TypeMismatchError(AdoType.Primitive, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => PrimitiveResponse)
  public async getValue(@Parent() primitive: PrimitiveContract, @Args('key') key: string): Promise<PrimitiveResponse> {
    return this.primitiveService.getValue(primitive.address, key)
  }
}
