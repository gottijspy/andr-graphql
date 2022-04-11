import { Query, Resolver } from '@nestjs/graphql'
import { AnchorAdoService } from './anchor-ado.service'
import { AnchorAdo } from './models'

@Resolver(AnchorAdo)
export class AnchorAdoResolver {
  constructor(private readonly anchorAdoService: AnchorAdoService) {}

  @Query(() => AnchorAdo)
  public async anchor(): Promise<AnchorAdo> {
    return this.anchorAdoService.instance()
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
