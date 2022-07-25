import { Field, Int, Float, ObjectType, createUnionType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types/ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class CW20TokenContract extends AdoContract {
  @Field(() => TokenInfo, { nullable: true })
  tokenInfo?: Promise<TokenInfo>
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

export const Cw20TokenResult = createUnionType({
  name: 'Cw20TokenResult',
  types: () => [CW20TokenContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.CW20Token) {
      return CW20TokenContract
    }

    return AdoContractError
  },
})
