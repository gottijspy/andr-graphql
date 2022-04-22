import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddressListAdoService } from './address-list-ado.service'
import { AddressListQuery, AddressListResponse } from './types'

@Resolver(AddressListQuery)
export class AddressListAdoResolver {
  constructor(private readonly addressListAdoService: AddressListAdoService) {}

  @Query(() => AddressListQuery)
  public async addresslist(@Args('contractAddress') contractAddress: string): Promise<AddressListQuery> {
    return { contractAddress: contractAddress } as AddressListQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() addressList: AddressListQuery): Promise<string> {
    return this.addressListAdoService.owner(addressList.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() addressList: AddressListQuery): Promise<string[]> {
    return this.addressListAdoService.operators(addressList.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() addressList: AddressListQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.addressListAdoService.isOperator(addressList.contractAddress, operatorAddress)
  }

  @ResolveField(() => AddressListResponse)
  public async includesAddress(
    @Parent() addressList: AddressListQuery,
    @Args('address') address: string,
  ): Promise<AddressListResponse> {
    return this.addressListAdoService.includesAddress(addressList.contractAddress, address)
  }
}
