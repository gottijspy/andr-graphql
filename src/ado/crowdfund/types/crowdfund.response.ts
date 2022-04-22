import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrAddress, AndrCoin, AndrExpiration, AndrRecipient } from 'src/ado/common/types'

@ObjectType()
export class CrowdfundState {
  @Field(() => AndrExpiration)
  expiration!: Promise<AndrExpiration>

  @Field(() => AndrCoin)
  price!: Promise<AndrCoin>

  @Field(() => Int)
  min_tokens_sold!: Promise<number>

  @Field(() => Int)
  max_amount_per_wallet!: Promise<number>

  @Field(() => Int)
  amount_sold!: Promise<number>

  @Field(() => Int)
  amount_to_send!: Promise<number>

  @Field(() => Int)
  amount_transferred!: Promise<number>

  @Field(() => AndrRecipient)
  recipient!: Promise<AndrRecipient>
}

@ObjectType()
export class CrowdfundConfig {
  @Field(() => AndrAddress)
  token_address!: Promise<AndrAddress>

  @Field(() => Boolean)
  can_mint_after_sale!: Promise<boolean>
}
