import { Query, Resolver } from '@nestjs/graphql'
import { PrimitiveAdo } from './models'
import { PrimitiveAdoService } from './primitive-ado.service'

@Resolver(PrimitiveAdo)
export class PrimitiveAdoResolver {
  constructor(private readonly primitiveAdoService: PrimitiveAdoService) {}

  @Query(() => PrimitiveAdo)
  public async primitive(): Promise<PrimitiveAdo> {
    return this.primitiveAdoService.instance()
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
