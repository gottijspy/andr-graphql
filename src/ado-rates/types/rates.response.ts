import { Field, Float, ObjectType } from '@nestjs/graphql'
import { AndrRecipient } from 'src/ado-common/types'
import { Coin } from 'src/common/models'

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
  @Field(() => Coin)
  flat?: Coin

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
