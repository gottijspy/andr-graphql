import { Query, Resolver } from '@nestjs/graphql'
import { AddressListAdoService } from './address-list-ado.service'
import { AddressListAdo } from './models'

@Resolver(AddressListAdo)
export class AddressListAdoResolver {
  constructor(private readonly addressListAdoService: AddressListAdoService) {}

  @Query(() => AddressListAdo)
  public async adresslistado(): Promise<AddressListAdo> {
    return await this.addressListAdoService.instance()
    //return {} as AddressListAdo
  }

  // @ResolveField(() => String)
  // public async primitiveContract(@Args('address') address: string): Promise<string> {
  //   return await this.tokenAdoService.primitiveContract(address);
  // }

  // @ResolveField(() => AdoSearchResult)
  // public async search(@Args('options') options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   return this.adoService.search(options)
  // }
}
