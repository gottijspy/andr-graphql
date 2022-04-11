import { Query, Resolver } from '@nestjs/graphql'
import { OffersAdo } from './models'
import { OffersAdoService } from './offers-ado.service'

@Resolver(OffersAdo)
export class OffersAdoResolver {
  constructor(private readonly offersAdoService: OffersAdoService) {}

  @Query(() => OffersAdo)
  public async adooffers(): Promise<OffersAdo> {
    return this.offersAdoService.instance()
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
