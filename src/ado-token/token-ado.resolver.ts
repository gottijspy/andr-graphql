import { Query, Resolver } from '@nestjs/graphql'
import { TokenAdo } from './models'
import { TokenAdoService } from './token-ado.service'

@Resolver(TokenAdo)
export class TokenAdoResolver {
  constructor(private readonly tokenAdoService: TokenAdoService) {}

  @Query(() => TokenAdo)
  public async tokenado(): Promise<TokenAdo> {
    return this.tokenAdoService.instance()
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
