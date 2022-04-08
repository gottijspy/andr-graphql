import { Query, Resolver } from '@nestjs/graphql'
import { MissionAdoService } from './mission-ado.service'
import { MissionAdo } from './models'

@Resolver(MissionAdo)
export class MissionAdoResolver {
  constructor(private readonly missionAdoService: MissionAdoService) {}

  @Query(() => MissionAdo)
  public async missionado(): Promise<MissionAdo> {
    return this.missionAdoService.instance()
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
