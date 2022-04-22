import { Query, Resolver } from '@nestjs/graphql'
import { ReceiptAdo } from './models'
import { ReceiptAdoService } from './receipt.service'

@Resolver(ReceiptAdo)
export class ReceiptAdoResolver {
  constructor(private readonly receiptAdoService: ReceiptAdoService) {}

  @Query(() => ReceiptAdo)
  public async receipt(): Promise<ReceiptAdo> {
    return this.receiptAdoService.instance()
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
