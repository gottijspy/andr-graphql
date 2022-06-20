import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenInfo {
  @Field()
  name!: string

  @Field()
  symbol!: string

  @Field(() => Int)
  decimals!: number

  @Field(() => Float)
  total_supply!: number
}

@ObjectType()
export class TxInfo {
  @Field(() => Int)
  height!: number

  @Field(() => String)
  hash!: string

  @Field(() => Int)
  code!: number

  @Field(() => String)
  rawLog!: string

  @Field(() => [Int])
  tx!: Uint8Array

  @Field(() => Int)
  gasUsed!: number

  @Field(() => Int)
  gasWanted!: number
}
