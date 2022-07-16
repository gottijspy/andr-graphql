import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, OfferResponse, OffersContract, OffersContractResult, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { AndrSearchOptions } from '../types/andr-search-options.input'
import { OffersService } from './offers.service'

@Resolver(OffersContract)
export class OffersResolver {
  constructor(private readonly offersService: OffersService) {}

  @Query(() => OffersContractResult)
  public async offers(@Args('address') address: string): Promise<typeof OffersContractResult> {
    const contractInfo = await this.offersService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Offers) {
      return contractInfo as OffersContract
    }

    const typeError = new TypeMismatchError(AdoType.Offers, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => OfferResponse)
  public async offer(@Parent() offer: OffersContract, @Args('tokenId') tokenId: string): Promise<OfferResponse> {
    return this.offersService.offer(offer.address, tokenId)
  }

  @ResolveField(() => [OfferResponse])
  public async allOffers(
    @Parent() offer: OffersContract,
    @Args('purchaser') purchaser: string,
    @Args('options') options: AndrSearchOptions,
  ): Promise<OfferResponse[]> {
    return this.offersService.allOffers(offer.address, purchaser, options)
  }
}
