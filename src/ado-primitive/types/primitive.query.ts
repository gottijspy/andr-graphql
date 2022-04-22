import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado-common/interfaces'

@ObjectType()
export class PrimitiveQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>
}
