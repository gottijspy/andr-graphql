import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrExpiration } from 'src/ado-common/models'

@ObjectType()
export class OfferInfo {
  @Field()
  denom!: string

  @Field(() => Int)
  offerAmount!: number

  @Field(() => Int)
  remainingAmount!: number

  @Field(() => Int)
  taxAmount!: number

  @Field(() => AndrExpiration)
  expiration!: AndrExpiration

  @Field()
  purchaser!: string
}
