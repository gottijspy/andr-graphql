import { Query, Resolver } from '@nestjs/graphql'
import { AuctionAdoService } from './auction-ado.service'
import { AuctionAdo } from './models'

@Resolver(AuctionAdo)
export class AuctionAdoResolver {
  constructor(private readonly auctionAdoService: AuctionAdoService) {}

  @Query(() => AuctionAdo)
  public async auction(): Promise<AuctionAdo> {
    return await this.auctionAdoService.instance()
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
