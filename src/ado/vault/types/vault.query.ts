import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { AndrCoin } from 'src/ado/common/types'
import { AndrStrategy } from '.'

@ObjectType()
export class VaultQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => [AndrCoin])
  balance!: Promise<AndrCoin[]>

  @Field(() => AndrStrategy)
  strategyAddress!: Promise<AndrStrategy>
}
