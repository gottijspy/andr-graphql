import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { Escrow } from './timelock.response'

@ObjectType()
export class TimelockQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => Escrow)
  getLockedFunds!: Promise<Escrow>

  @Field(() => [Escrow])
  getLockedFundsForRecipient!: Promise<Escrow[]>
}
