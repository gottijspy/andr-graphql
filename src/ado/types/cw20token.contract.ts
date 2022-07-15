import { Field, Int, Float, ObjectType, createUnionType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types/ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class CW20TokenContract extends AdoContract {
  @Field(() => TokenInfo)
  tokenInfo!: Promise<TokenInfo>

  @Field(() => [TxInfo])
  tx!: Promise<TxInfo[]>
}

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

export const Cw20TokenContractResult = createUnionType({
  name: 'Cw20TokenContractResult',
  types: () => [CW20TokenContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.CW20Token) {
      return CW20TokenContract
    }

    return AdoContractError
  },
})
