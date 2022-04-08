import { Query, Resolver } from '@nestjs/graphql'
import { RatesAdo } from './models'
import { RatesAdoService } from './rates-ado.service'

@Resolver(RatesAdo)
export class RatesAdoResolver {
  constructor(private readonly ratesAdoService: RatesAdoService) {}

  @Query(() => RatesAdo)
  public async ratesado(): Promise<RatesAdo> {
    return this.ratesAdoService.instance()
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
