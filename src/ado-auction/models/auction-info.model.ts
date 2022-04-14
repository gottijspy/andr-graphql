import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuctionInfo {
  @Field(() => [Int])
  auctionIds!: number[]

  @Field()
  tokenAddress!: string

  @Field()
  tokenId!: string
}
