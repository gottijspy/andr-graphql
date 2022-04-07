import { Resolver } from '@nestjs/graphql'
import { TokenAdo } from './models'
//import { AdoService } from './ado.service'
//import { Ado } from './models'

@Resolver(TokenAdo)
export class AdoResolver {
  //constructor(private readonly adoService: AdoService) {}
  // @Query(() => Ado)
  // public async ado(): Promise<Ado> {
  //   return {} as Ado
  // }
  // @ResolveField(() => String)
  // public async owner(@Args('address') address: string): Promise<string> {
  //   return 'terra1....'
  // }
  // @ResolveField(() => AdoSearchResult)
  // public async search(@Args('options') options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   return this.adoService.search(options)
  // }
}
