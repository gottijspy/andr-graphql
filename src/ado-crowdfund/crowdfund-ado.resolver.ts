import { Query, Resolver } from '@nestjs/graphql'
import { CrowdfundAdoService } from './crowdfund-ado.service'
import { CrowdfundAdo } from './models'

@Resolver(CrowdfundAdo)
export class CrowdfundAdoResolver {
  constructor(private readonly crowdfundAdoService: CrowdfundAdoService) {}

  @Query(() => CrowdfundAdo)
  public async crowdfundado(): Promise<CrowdfundAdo> {
    return this.crowdfundAdoService.instance()
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
