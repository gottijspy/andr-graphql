import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoType } from 'src/ado/andr-query/types'
import { AdoPackageService } from './ado-package.service'
import { AdoPackage, ADOPQuery } from './types'

@Resolver(ADOPQuery)
export class AdoPackageResolver {
  constructor(private readonly adoPackageService: AdoPackageService) {}

  @Query(() => ADOPQuery)
  public async ADOP(): Promise<ADOPQuery> {
    return {} as ADOPQuery
  }

  @ResolveField(() => [String])
  public async adoTypes(): Promise<string[]> {
    return this.adoPackageService.getAdoTypes()
  }

  @ResolveField(() => AdoPackage)
  public async package(@Args('adoType') adoType: string): Promise<AdoPackage> {
    return this.adoPackageService.getPackage(adoType as AdoType)
  }
}
