import { Field, ObjectType } from '@nestjs/graphql'
import { AndrCoin, AndrExpiration, AndrRecipient } from 'src/ado/common/types'

@ObjectType()
export class EscrowCondition {
  @Field(() => AndrExpiration, { nullable: true })
  expiration?: AndrExpiration

  @Field(() => [AndrCoin], { nullable: true })
  miniumFunds?: AndrCoin[]
}

@ObjectType()
export class Escrow {
  @Field(() => [AndrCoin])
  coins!: AndrCoin[]

  @Field(() => EscrowCondition, { nullable: true })
  condition?: EscrowCondition

  @Field(() => AndrRecipient)
  recipient!: AndrRecipient
}

@ObjectType()
export class LockedFunds {
  @Field(() => Escrow, { nullable: true })
  funds?: Escrow
}
