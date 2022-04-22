import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Bid {
  @Field()
  bidder!: string

  @Field(() => Int)
  amount!: number

  @Field()
  timestamp!: string
}
