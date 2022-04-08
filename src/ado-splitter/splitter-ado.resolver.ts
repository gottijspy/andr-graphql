import { Query, Resolver } from '@nestjs/graphql'
import { SplitterAdo } from './models'
import { SplitterAdoService } from './splitter-ado.service'

@Resolver(SplitterAdo)
export class SplitterAdoResolver {
  constructor(private readonly splitterAdoService: SplitterAdoService) {}

  @Query(() => SplitterAdo)
  public async splitterado(): Promise<SplitterAdo> {
    return this.splitterAdoService.instance()
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
