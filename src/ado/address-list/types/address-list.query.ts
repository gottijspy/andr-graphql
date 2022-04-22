import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { AddressListResponse } from './address-list.response'

@ObjectType()
export class AddressListQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => AddressListResponse)
  includesAddress!: Promise<AddressListResponse>
}
