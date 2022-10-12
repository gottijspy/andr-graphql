import { Args, Query, Resolver } from '@nestjs/graphql'
import { AdoPackageService } from './ado-package.service'
import { AdoPackage, ADOPArgs } from './types'

@Resolver(AdoPackage)
export class AdoPackageResolver {
  constructor(private readonly adoPackageService: AdoPackageService) {}

  @Query(() => AdoPackage)
  public async ADOP(@Args() args: ADOPArgs): Promise<AdoPackage> {
    return this.adoPackageService.getPackage(args.adoType)
  }
}
