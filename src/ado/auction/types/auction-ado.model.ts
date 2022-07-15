import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/common/interfaces'
import { AndrAddress, AndrExpiration } from 'src/ado/common/types'

/*
The Auction ADO is a smart contract that allows performing auctions on NFT tokens. 
The owner can send an NFT to this contract with the required messages to start an auction on it. 
Once the auction has started users can place bids on the token until the auction expires. 
The highest bid will win the auction sending the funds to the seller and receiving the token in return.
*/

@ObjectType({
  implements: () => [BaseAdo],
})
export class AuctionAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Auction

  @Field(() => Int)
  auctionId!: number

  @Field()
  tokenId!: string

  @Field()
  tokenAddress!: string

  @Field(() => AndrExpiration)
  startTime!: AndrExpiration

  @Field(() => AndrExpiration)
  endTime!: AndrExpiration

  @Field(() => AndrAddress)
  highBidderAddr!: AndrAddress

  @Field(() => Int)
  highBidderAmount!: number

  @Field()
  coinDenom!: string

  @Field(() => [AndrAddress], { nullable: true })
  whitelist?: AndrAddress[]

  @Field()
  owner!: string

  @Field()
  isCancelled!: boolean
}
