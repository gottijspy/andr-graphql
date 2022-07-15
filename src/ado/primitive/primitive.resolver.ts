import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  AdoContractError,
  PrimitiveContract,
  PrimitiveContractResult,
  PrimitiveResponse,
  TypeMismatchError,
} from 'src/ado/types'
import { AdoType } from '../types/ado.enums'
import { PrimitiveAdoService } from './primitive.service'

@Resolver(PrimitiveContract)
export class PrimitiveAdoResolver {
  constructor(private readonly primitiveAdoService: PrimitiveAdoService) {}

  @Query(() => PrimitiveContractResult)
  public async primitive(@Args('address') address: string): Promise<typeof PrimitiveContractResult> {
    const contractInfo = await this.primitiveAdoService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Primitive) {
      return contractInfo as PrimitiveContract
    }

    const typeError = new TypeMismatchError(AdoType.Primitive, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() primitive: PrimitiveContract): Promise<string> {
    return this.primitiveAdoService.owner(primitive.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() primitive: PrimitiveContract): Promise<string[]> {
    return this.primitiveAdoService.operators(primitive.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() primitive: PrimitiveContract,
    @Args('operator') operator: string,
  ): Promise<boolean> {
    return this.primitiveAdoService.isOperator(primitive.address, operator)
  }

  @ResolveField(() => PrimitiveResponse)
  public async getValue(@Parent() primitive: PrimitiveContract, @Args('key') key: string): Promise<PrimitiveResponse> {
    return this.primitiveAdoService.getValue(primitive.address, key)
  }
}
