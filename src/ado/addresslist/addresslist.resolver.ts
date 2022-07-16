import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  AddresslistContract,
  AddresslistContractResult,
  AddresslistResponse,
  AdoContractError,
  TypeMismatchError,
} from '../types'
import { AdoType } from '../types/ado.enums'
import { AddresslistService } from './addresslist.service'

@Resolver(AddresslistContract)
export class AddresslistResolver {
  constructor(private readonly addresslistService: AddresslistService) {}

  @Query(() => AddresslistContractResult)
  public async addresslist(@Args('address') address: string): Promise<typeof AddresslistContractResult> {
    const contractInfo = await this.addresslistService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Addresslist) {
      return contractInfo as AddresslistContract
    }

    const typeError = new TypeMismatchError(AdoType.Addresslist, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() addressList: AddresslistContract): Promise<string> {
    return this.addresslistService.owner(addressList.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() addressList: AddresslistContract): Promise<string[]> {
    return this.addresslistService.operators(addressList.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() addressList: AddresslistContract,
    @Args('operator') operator: string,
  ): Promise<boolean> {
    return this.addresslistService.isOperator(addressList.address, operator)
  }

  @ResolveField(() => AddresslistResponse)
  public async includesAddress(
    @Parent() addressList: AddresslistContract,
    @Args('address') address: string,
  ): Promise<AddresslistResponse> {
    return this.addresslistService.includesAddress(addressList.address, address)
  }
}
