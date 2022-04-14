import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrExpirationType } from 'src/ado-common/enums'
import { AndrSearchOptions } from 'src/ado-common/models'
import { OfferInfo, Offers } from './models'
//import { OffersAdoService } from './offers-ado.service'

@Resolver(Offers)
export class OffersAdoResolver {
  //constructor(private readonly offersAdoService: OffersAdoService) {}

  @Query(() => Offers)
  public async offers(): Promise<Offers> {
    return {} as Offers
  }

  @ResolveField(() => OfferInfo)
  public async offer(@Args('tokenId') tokenId: string): Promise<OfferInfo> {
    return {
      denom: 'uusd',
      offerAmount: 1000,
      remainingAmount: 997,
      taxAmount: 2,
      expiration: {
        expirationType: AndrExpirationType.AtHeight,
        expirationValue: '500',
      },
      purchaser: 'terra1...',
    } as OfferInfo
  }

  @ResolveField(() => [OfferInfo])
  public async allOffers(
    @Args('purchaser') purchaser: string,
    @Args('options') options: AndrSearchOptions,
  ): Promise<OfferInfo[]> {
    return [
      {
        denom: 'uusd',
        offerAmount: 1000,
        remainingAmount: 997,
        taxAmount: 2,
        expiration: {
          expirationType: AndrExpirationType.AtHeight,
          expirationValue: '500',
        },
        purchaser: 'terra1...',
      },
    ] as OfferInfo[]
  }
}
