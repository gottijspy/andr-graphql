import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class BlockHeader {
  @Field(() => GraphQLJSON, { nullable: true })
  version?: {
    block?: string
    app?: string
  }

  @Field(() => Int, { nullable: true })
  height?: number

  @Field({ nullable: true })
  chainId?: string

  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  @Field({ nullable: true })
  time?: string
}

@ObjectType()
export class BlockInfo {
  @Field()
  id!: string

  @Field(() => BlockHeader, { nullable: true })
  header?: BlockHeader
}
