import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado-common/interfaces'
import { Splitter } from '.'

@ObjectType()
export class SplitterQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => Splitter)
  config!: Promise<Splitter>
}
