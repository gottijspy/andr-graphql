import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoType, AndrStrategyType } from 'src/ado/types/ado.enums'
import { AdoContract, AdoContractError, Coin } from './ado.contract'

@ObjectType()
export class VaultContract extends AdoContract {
  @Field(() => [Coin], { nullable: true })
  balance?: Promise<Coin[]>

  @Field(() => AndrStrategy, { nullable: true })
  strategyAddress?: Promise<AndrStrategy>
}

@ObjectType()
export class AndrStrategy {
  @Field(() => AndrStrategyType, { nullable: true })
  strategyType?: string

  @Field({ nullable: true })
  address?: string
}

export const VaultResult = createUnionType({
  name: 'VaultResult',
  types: () => [VaultContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Vault) {
      return VaultContract
    }

    return AdoContractError
  },
})
