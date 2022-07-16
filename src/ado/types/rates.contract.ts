import { createUnionType, Field, Float, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError, Coin } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class RatesContract extends AdoContract {
  @Field(() => [RateInfo], { nullable: true })
  payments?: Promise<RateInfo[]>
}

@ObjectType()
export class PercentRate {
  @Field(() => Float, { nullable: true })
  decimal?: number
}

@ObjectType()
export class ADORate {
  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  key?: string
}

@ObjectType()
export class Rate {
  @Field(() => Coin, { nullable: true })
  flat?: Coin

  @Field(() => PercentRate, { nullable: true })
  percent?: PercentRate

  @Field(() => ADORate, { nullable: true })
  external?: ADORate
}

@ObjectType()
export class RateInfo {
  @Field(() => Rate, { nullable: true })
  rate?: Rate

  @Field(() => Boolean, { nullable: true })
  is_additive?: boolean

  @Field({ nullable: true })
  description?: string

  @Field(() => [GraphQLJSON], { nullable: true })
  receivers?: JSON[]
}

export const RatesResult = createUnionType({
  name: 'RatesResult',
  types: () => [RatesContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Rates) {
      return RatesContract
    }

    return AdoContractError
  },
})
