import { createUnionType, Field, Float, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError, Coin } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class RatesContract extends AdoContract {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => [RateInfo])
  payments!: Promise<RateInfo[]>
}

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

  @Field(() => [GraphQLJSON], { nullable: true })
  receivers?: JSON[]
}

export const RatesContractResult = createUnionType({
  name: 'RatesContractResult',
  types: () => [RatesContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Rates) {
      return RatesContract
    }

    return AdoContractError
  },
})
