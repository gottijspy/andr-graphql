import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError, Coin } from 'src/ado/types/ado.contract'
import { AdoType } from 'src/ado/types/ado.enums'

@ObjectType()
export class CrowdfundContract extends AdoContract {
  @Field(() => CrowdfundState)
  state!: Promise<CrowdfundState>

  @Field(() => CrowdfundConfig)
  config!: Promise<CrowdfundConfig>

  @Field(() => [String])
  availableTokens!: Promise<string[]>

  @Field(() => Boolean)
  isTokenAvailable!: Promise<boolean>
}

@ObjectType()
export class CrowdfundState {
  @Field(() => GraphQLJSON, { nullable: true })
  expiration?: Promise<JSON>

  @Field(() => Coin, { nullable: true })
  price?: Promise<Coin>

  @Field(() => Int, { nullable: true })
  min_tokens_sold?: Promise<number>

  @Field(() => Int, { nullable: true })
  max_amount_per_wallet?: Promise<number>

  @Field(() => Int, { nullable: true })
  amount_sold?: Promise<number>

  @Field(() => Int, { nullable: true })
  amount_to_send?: Promise<number>

  @Field(() => Int, { nullable: true })
  amount_transferred?: Promise<number>

  @Field(() => GraphQLJSON, { nullable: true })
  recipient?: Promise<JSON>
}

@ObjectType()
export class CrowdfundConfig {
  @Field(() => GraphQLJSON)
  token_address!: Promise<JSON>

  @Field(() => Boolean)
  can_mint_after_sale!: Promise<boolean>
}

export const CrowdfundContractResult = createUnionType({
  name: 'CrowdfundContractResult',
  types: () => [CrowdfundContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Crowdfund) {
      return CrowdfundContract
    }

    return AdoContractError
  },
})
