import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoResolver } from '../ado.resolver'
import {
  AddresslistContract,
  AddresslistResult,
  AddresslistResponse,
  AdoContractError,
  TypeMismatchError,
} from '../types'
import { AdoType } from '../types/ado.enums'
import { AddresslistService } from './addresslist.service'

@Resolver(AddresslistContract)
export class AddresslistResolver extends AdoResolver {
  constructor(private readonly addresslistService: AddresslistService) {
    super(addresslistService)
  }

  @Query(() => AddresslistResult)
  public async addresslist(@Args('address') address: string): Promise<typeof AddresslistResult> {
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

  @ResolveField(() => AddresslistResponse)
  public async includesAddress(
    @Parent() addressList: AddresslistContract,
    @Args('address') address: string,
  ): Promise<AddresslistResponse> {
    return this.addresslistService.includesAddress(addressList.address, address)
  }
}
