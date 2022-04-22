import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrSearchOptions } from 'src/ado/common/models'
import { OffersAdoService } from './offers.service'
import { OfferResponse, OffersQuery } from './types'

@Resolver(OffersQuery)
export class OffersAdoResolver {
  constructor(private readonly offersAdoService: OffersAdoService) {}

  @Query(() => OffersQuery)
  public async offers(@Args('contractAddress') contractAddress: string): Promise<OffersQuery> {
    return { contractAddress: contractAddress } as OffersQuery
  }

  @ResolveField(() => OfferResponse)
  public async offer(@Parent() offer: OffersQuery, @Args('tokenId') tokenId: string): Promise<OfferResponse> {
    return this.offersAdoService.offer(offer.contractAddress, tokenId)
  }

  @ResolveField(() => [OfferResponse])
  public async allOffers(
    @Parent() offer: OffersQuery,
    @Args('purchaser') purchaser: string,
    @Args('options') options: AndrSearchOptions,
  ): Promise<OfferResponse[]> {
    return this.offersAdoService.allOffers(offer.contractAddress, purchaser, options)
  }
}
