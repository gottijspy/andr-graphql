import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ArgsType()
export class TxSearchArgs {
  @Field(() => Int, { nullable: true })
  height?: number

  @Field({ nullable: true })
  sentFromOrTo?: string

  @Field({ nullable: true })
  contractAddress?: string
}

@ArgsType()
export class TxFilterParams {
  @Field(() => Int, { nullable: true })
  minHeight?: number

  @Field(() => Int, { nullable: true })
  maxHeight?: number
}

@ObjectType()
export class TxInfo {
  @Field(() => Int)
  height!: number

  @Field()
  hash!: string

  @Field(() => Int, { nullable: true })
  code?: number

  @Field({ nullable: true })
  rawLog?: string

  @Field(() => GraphQLJSON, { nullable: true })
  tx?: Uint8Array

  @Field(() => Int, { nullable: true })
  gasUsed?: number

  @Field(() => Int, { nullable: true })
  gasWanted?: number
}

@ObjectType()
export class TxSearchResult {
  @Field(() => TxInfo, { nullable: true })
  byHash?: TxInfo

  @Field(() => [TxInfo], { nullable: true })
  byHeight?: TxInfo[]

  @Field(() => [TxInfo], { nullable: true })
  byContract?: TxInfo[]

  @Field(() => [TxInfo], { nullable: true })
  byAccount?: TxInfo[]
}
