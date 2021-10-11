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
  sender: string

  @Field()
  recipient: string

  @Field()
  datetime: Date
}
