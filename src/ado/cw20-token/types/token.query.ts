import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { TokenInfo, TxInfo } from './token.response'

@ObjectType()
export class CW20TokenQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => TokenInfo)
  tokenInfo!: Promise<TokenInfo>

  @Field(() => [TxInfo])
  tx!: Promise<TxInfo[]>
}
