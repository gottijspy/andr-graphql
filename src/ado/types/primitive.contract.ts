import { Field, ObjectType, Int, Float, createUnionType } from '@nestjs/graphql'
import { AndrCoin } from 'src/ado/common/types'
import { AdoContract, AdoContractError } from './ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class PrimitiveContract extends AdoContract {
  @Field(() => PrimitiveResponse)
  getValue!: Promise<PrimitiveResponse>
}

@ObjectType()
export class Primitive {
  @Field(() => Int, { nullable: true })
  uint128?: number

  @Field(() => Float, { nullable: true })
  decimal?: number

  @Field(() => AndrCoin, { nullable: true })
  coin?: AndrCoin

  @Field(() => String, { nullable: true })
  string?: string

  @Field(() => Boolean, { nullable: true })
  bool?: boolean

  @Field(() => [Primitive], { nullable: true })
  vec?: Primitive[]
}

@ObjectType()
export class PrimitiveResponse {
  @Field(() => String)
  key!: string

  @Field(() => Primitive)
  value!: Primitive
}

export const PrimitiveContractResult = createUnionType({
  name: 'PrimitiveContractResult',
  types: () => [PrimitiveContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Primitive) {
      return PrimitiveContract
    }

    return AdoContractError
  },
})
