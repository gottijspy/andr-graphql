import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoService } from './ado.service'
import { Ado, AdoSearchOptions, AdoSearchResult } from './models'

@Resolver(Ado)
export class AdoResolver {
  constructor(private readonly adoService: AdoService) {}

  @Query(() => Ado)
  public async ado(): Promise<Ado> {
    return {} as Ado
  }

  @ResolveField(() => AdoSearchResult)
  public async search(@Args('options') options: AdoSearchOptions): Promise<AdoSearchResult> {
    return this.adoService.search(options)
  }
}
