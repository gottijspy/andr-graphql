import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError, Coin } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class TimelockContract extends AdoContract {
  @Field(() => Escrow)
  getLockedFunds!: Promise<Escrow>

  @Field(() => [Escrow])
  getLockedFundsForRecipient!: Promise<Escrow[]>
}

@ObjectType()
export class EscrowCondition {
  @Field(() => GraphQLJSON, { nullable: true })
  expiration?: JSON

  @Field(() => [Coin], { nullable: true })
  miniumFunds?: Coin[]
}

@ObjectType()
export class Escrow {
  @Field(() => [Coin])
  coins!: Coin[]

  @Field(() => EscrowCondition, { nullable: true })
  condition?: EscrowCondition

  @Field(() => GraphQLJSON, { nullable: true })
  recipient?: JSON
}

@ObjectType()
export class LockedFunds {
  @Field(() => Escrow, { nullable: true })
  funds?: Escrow
}

export const TimelockContractResult = createUnionType({
  name: 'TimelockContractResult',
  types: () => [TimelockContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Timelock) {
      return TimelockContract
    }

    return AdoContractError
  },
})
