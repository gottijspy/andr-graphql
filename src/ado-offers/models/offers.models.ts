import { Field, ObjectType } from '@nestjs/graphql'
import { OfferInfo } from '.'

@ObjectType()
export class Offers {
  @Field(() => OfferInfo)
  offer!: Promise<OfferInfo>

  @Field(() => [OfferInfo])
  allOffers!: Promise<OfferInfo[]>
}
