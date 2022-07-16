import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoType, AndrStrategyType } from 'src/ado/types/ado.enums'
import { AdoContract, AdoContractError, Coin } from './ado.contract'

@ObjectType()
export class VaultContract extends AdoContract {
  @Field(() => [Coin])
  balance!: Promise<Coin[]>

  @Field(() => AndrStrategy)
  strategyAddress!: Promise<AndrStrategy>
}

@ObjectType()
export class AndrStrategy {
  @Field(() => AndrStrategyType, { nullable: true })
  strategyType?: string

  @Field({ nullable: true })
  address?: string
}

export const VaultContractResult = createUnionType({
  name: 'VaultContractResult',
  types: () => [VaultContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Vault) {
      return VaultContract
    }

    return AdoContractError
  },
})
