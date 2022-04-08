import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrAddress } from 'src/ado/common/models'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class AuctionAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Auction

  @Field()
  start_time!: string

  @Field()
  end_time!: string

  @Field(() => AndrAddress)
  highBidderAddr!: Promise<AndrAddress>

  @Field(() => Int)
  highBidderAmount!: number

  @Field()
  coinDenom!: string

  @Field(() => Int)
  auctionId!: number

  @Field(() => [AndrAddress], { nullable: true })
  whitelist?: Promise<AndrAddress[]>

  @Field()
  owner!: string

  @Field()
  tokenId!: string

  @Field()
  tokenAddress!: string

  @Field()
  isCancelled!: boolean
}
