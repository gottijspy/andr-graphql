import { Field, ObjectType } from '@nestjs/graphql'
import { BaseQuery } from 'src/ado-common/interfaces'
import { OfferResponse } from '.'

@ObjectType()
export class OffersQuery implements BaseQuery {
  @Field()
  contractAddress!: string

  //ERR: LCDClientError
  @Field(() => OfferResponse)
  offer!: Promise<OfferResponse>

  @Field(() => [OfferResponse])
  allOffers!: Promise<OfferResponse[]>
}
