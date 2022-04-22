import { Query, Resolver } from '@nestjs/graphql'
import { TimelockAdo } from './models'
import { TimelockAdoService } from './timelock.service'

@Resolver(TimelockAdo)
export class TimelockAdoResolver {
  constructor(private readonly timelockAdoService: TimelockAdoService) {}

  @Query(() => TimelockAdo)
  public async timelock(): Promise<TimelockAdo> {
    return this.timelockAdoService.instance()
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
