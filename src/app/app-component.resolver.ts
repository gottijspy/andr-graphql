import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoService } from 'src/ado/ado.service'
import { AdoContract } from 'src/ado/types'
import { AdoType } from '../ado/types/ado.enums'
import { CW721Service } from '../cw721/cw721.service'
import { AttributeSearchOptions, NftInfo } from '../cw721/types'
import { AppComponent } from './types'

@Resolver(AppComponent)
export class AppComponentResolver {
  constructor(private readonly adoService: AdoService, private readonly cw721Service: CW721Service) {}

  @ResolveField(() => AdoContract)
  public async component(@Parent() component: AppComponent): Promise<AdoContract> {
    if (!component.address) return {} as AdoContract
    return this.adoService.getContract(component.address)
  }

  @ResolveField(() => [NftInfo])
  public async tokens(@Parent() component: AppComponent, @Args() filters?: AttributeSearchOptions): Promise<NftInfo[]> {
    if (component.address && component.ado_type === AdoType.CW721) {
      return this.cw721Service.searchTokens(component.address, filters?.attributes)
    }

    return [] as NftInfo[]
  }
}
