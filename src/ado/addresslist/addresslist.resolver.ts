import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoResolver } from '../ado.resolver'
import { AddresslistContract, AddresslistResponse, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AddresslistService } from './addresslist.service'

@Resolver(AddresslistContract)
export class AddresslistResolver extends AdoResolver {
  constructor(private readonly addresslistService: AddresslistService) {
    super(addresslistService)
  }

  @Query(() => AddresslistContract)
  public async addresslist(@Args('address') address: string): Promise<AddresslistContract> {
    const contractInfo = await this.addresslistService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.AddressList) {
      return contractInfo as AddresslistContract
    }

    const typeError = new TypeMismatchError(AdoType.AddressList, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => AddresslistResponse)
  public async includesAddress(
    @Parent() addressList: AddresslistContract,
    @Args('address') address: string,
  ): Promise<AddresslistResponse> {
    return this.addresslistService.includesAddress(addressList.address, address)
  }
}
