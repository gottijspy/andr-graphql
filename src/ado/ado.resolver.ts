import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoService } from './ado.service'
import { AdoType } from './andr-query/types'
import { AppAdo } from './app/types'
import { AuctionAdo } from './auction/types'
import { CW721Ado } from './cw721/types'
// import { AddressListAdo } from './addresslist/types'
// import { AdoType } from './andr-query/types'
// import { AuctionAdo } from './auction/types'
// import { CW721Ado } from './cw721/types'
// import { AppAdo } from './app/types'
// import { CrowdfundAdo } from './crowdfund/types'
// import { CW20Ado } from './cw20/types'
// import { FactoryAdo } from './factory/types'
// import { PrimitiveAdo } from './primitive/types'
// import { RatesAdo } from './rates/types'
// import { SplitterAdo } from './splitter/types'
// import { TimelockAdo } from './timelock/types'
import { AdoQuery } from './types'
// import { VaultAdo } from './vault/types'

@Resolver(AdoQuery)
export class AdoResolver {
  constructor(private readonly adoService: AdoService) {}

  @Query(() => AdoQuery)
  public async ADO(): Promise<AdoQuery> {
    return {} as AdoQuery
  }

  // @ResolveField(() => AddressListAdo)
  // public async addresslist(@Args('address') address: string): Promise<AddressListAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.AddressList) {
  //     return contractInfo as AddressListAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.AddressList, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  @ResolveField(() => AppAdo)
  public async app(@Args('address') address: string): Promise<AppAdo> {
    return this.adoService.getAdo<AppAdo>(address, AdoType.App)
  }

  @ResolveField(() => AuctionAdo)
  public async auction(@Args('address') address: string): Promise<AuctionAdo> {
    return this.adoService.getAdo<AuctionAdo>(address, AdoType.Auction)
  }

  // @ResolveField(() => CrowdfundAdo)
  // public async crowdfund(@Args('address') address: string): Promise<CrowdfundAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.Crowdfund) {
  //     return contractInfo as CrowdfundAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Crowdfund, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // @ResolveField(() => CW20Ado)
  // public async cw20(@Args('address') address: string): Promise<CW20Ado> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.CW20) {
  //     return contractInfo as CW20Ado
  //   }

  //   const typeError = new TypeMismatchError(AdoType.CW20, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  @ResolveField(() => CW721Ado)
  public async cw721(@Args('address') address: string): Promise<CW721Ado> {
    return this.adoService.getAdo<CW721Ado>(address, AdoType.CW721)
  }

  // @ResolveField(() => FactoryAdo)
  // public async factory(@Args('address') address: string): Promise<FactoryAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.Factory) {
  //     return contractInfo as FactoryAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Factory, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // @ResolveField(() => PrimitiveAdo)
  // public async primitive(@Args('address') address: string): Promise<PrimitiveAdo> {
  //   return this.adoService.getAdo<PrimitiveAdo>(address, AdoType.Primitive)
  // }

  // @ResolveField(() => RatesAdo)
  // public async rates(@Args('address') address: string): Promise<RatesAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if ('error' in contractInfo) {
  //     return contractInfo as RatesAdo
  //   }

  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.Rates) {
  //     return contractInfo as RatesAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Rates, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // @ResolveField(() => SplitterAdo)
  // public async splitter(@Args('address') address: string): Promise<SplitterAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.Splitter) {
  //     return contractInfo as SplitterAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Splitter, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // @ResolveField(() => TimelockAdo)
  // public async timelock(@Args('address') address: string): Promise<TimelockAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.Timelock) {
  //     return contractInfo as TimelockAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Timelock, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // @ResolveField(() => VaultAdo)
  // public async vault(@Args('address') address: string): Promise<VaultAdo> {
  //   const contractInfo = await this.adosService.getContract(address)
  //   if (contractInfo.adoType && contractInfo.adoType == AdoType.Vault) {
  //     return contractInfo as VaultAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Vault, contractInfo.adoType)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // @ResolveField(() => BaseAdo)
  // public async ado(@Args('address') address: string): Promise<BaseAdo> {
  //   return this.adosService.getContract(address)
  // }
}
