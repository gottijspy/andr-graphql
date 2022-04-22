import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrQuery } from 'src/ado/common/interfaces'
import { AuctionAdo, AuctionInfo, Bid } from '.'

@ObjectType()
export class Auction implements AndrQuery {
  @Field(() => AuctionAdo)
  latestAuctionState!: Promise<AuctionAdo>

  @Field(() => AuctionAdo)
  auctionState!: Promise<AuctionAdo>

  @Field(() => [Bid])
  bids!: Promise<Bid[]>

  @Field(() => AuctionInfo)
  auctionInfo!: Promise<AuctionInfo>

  @Field(() => [Int])
  auctionIds!: Promise<number[]>

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>
}
