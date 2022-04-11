import { Query, Resolver } from '@nestjs/graphql'
import { VaultAdo } from './models'
import { VaultAdoService } from './vault-ado.service'

@Resolver(VaultAdo)
export class VaultAdoResolver {
  constructor(private readonly vaultAdoService: VaultAdoService) {}

  @Query(() => VaultAdo)
  public async vault(): Promise<VaultAdo> {
    return this.vaultAdoService.instance()
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
