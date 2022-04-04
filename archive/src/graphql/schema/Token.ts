import { ObjectType, Field } from 'type-graphql'

@ObjectType({ simpleResolvers: true })
export class Token {
  @Field()
  symbol: string

  @Field()
  name: string

  @Field()
  minter: string

  @Field()
  token: string
}