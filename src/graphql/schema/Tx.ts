import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType({ simpleResolvers: true })
export class Tx {
  @Field()
  createdAt: Date

  @Field((type) => Int)
  id: number

  @Field((type) => Int)
  height: number

  @Field()
  txHash: string

  @Field()
  token_id: string

  @Field({ nullable: true })
  sender?: string

  @Field({ nullable: true })
  amount?: string

  @Field({ nullable: true })
  purchaser?: string

  @Field({ nullable: true })
  operator?: string

  @Field({ nullable: true })
  spender?: string

  @Field({ nullable: true })
  recipient?: string

  @Field()
  datetime: Date

  @Field()
  operate: string
}
