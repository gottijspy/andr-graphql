import { Field, ObjectType } from '@nestjs/graphql'
import { AssetResult } from '../assets/types'

@ObjectType()
export class AccountsQuery {
  @Field(() => [AssetResult])
  assets!: string

  @Field()
  wallets!: string
}
