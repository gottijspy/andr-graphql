import { Query, Resolver } from '@nestjs/graphql'
import { CW20TokenAdoService } from './cw20-token.service'
import { CW20TokenAdo } from './types'

@Resolver(CW20TokenAdo)
export class CW20TokenAdoResolver {
  constructor(private readonly cw20tokenAdoService: CW20TokenAdoService) {}

  @Query(() => CW20TokenAdo)
  public async cw20token(): Promise<CW20TokenAdo> {
    return this.cw20tokenAdoService.instance()
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
