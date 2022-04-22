import { Field, Float, ObjectType } from '@nestjs/graphql'
import { AndrCoin, AndrRecipient } from 'src/ado/common/types'

@ObjectType()
export class PercentRate {
  @Field(() => Float)
  decimal!: number
}

@ObjectType()
export class ADORate {
  @Field()
  address!: string

  @Field()
  key?: string
}

@ObjectType()
export class Rate {
  @Field(() => AndrCoin)
  flat?: AndrCoin

  @Field(() => PercentRate)
  percent?: PercentRate

  @Field(() => ADORate)
  external?: ADORate
}

@ObjectType()
export class RateInfo {
  @Field(() => Rate)
  rate!: Rate

  @Field()
  is_additive!: boolean

  @Field()
  description?: string

  @Field(() => [AndrRecipient])
  receivers!: AndrRecipient[]
}
