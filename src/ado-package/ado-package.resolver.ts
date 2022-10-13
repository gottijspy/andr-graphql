import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoPackageService } from './ado-package.service'
import { AdoPackage, ADOPArgs, ADOPQuery } from './types'

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
  public async package(@Args() args: ADOPArgs): Promise<AdoPackage> {
    return this.adoPackageService.getPackage(args.adoType)
  }
}
