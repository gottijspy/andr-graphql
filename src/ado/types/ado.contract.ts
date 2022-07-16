import { createUnionType, Field, Int, InterfaceType, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/ado/types/ado.enums'
import { BaseContract } from 'src/wasm/types/wasm.contract'
import { ANDR_QUERY } from './ado.constants'

@InterfaceType()
export abstract class BaseAdoContract extends BaseContract {
  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  // TODO: figure out a way to specify field with required arguments
  // @Field(() => Boolean)
  // isOperator!: Promise<boolean>
}

@ObjectType({
  implements: [BaseAdoContract],
})
export class AdoContract implements BaseAdoContract {
  @Field(() => String)
  address!: string

  @Field(() => Int)
  codeId!: number

  @Field(() => String)
  creator!: string

  @Field(() => String, { nullable: true })
  admin?: string

  @Field(() => String)
  label!: string

  @Field(() => String, { nullable: true })
  ibcPortId?: string

  @Field(() => [String], { nullable: true })
  queries_expected?: string[]

  @Field(() => AdoType)
  adoType!: AdoType

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>
}

@ObjectType()
export class Coin {
  @Field()
  denom!: string

  @Field()
  amount!: string
}

export class TypeMismatchError {
  constructor(expectedType: AdoType, observedType: AdoType) {
    this.code = 1
    this.error = `TypeError: expecting ${expectedType} contract, found: ${observedType}`
  }

  code?: number
  error!: string
}

@ObjectType()
export class AdoContractError {
  @Field(() => Int, { nullable: true })
  code?: number

  @Field()
  error!: string
}

export const AdoContractResult = createUnionType({
  name: 'AdoContractResult',
  types: () => [AdoContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.queries_expected && contract.queries_expected.includes(ANDR_QUERY)) {
      return AdoContract
    }

    return AdoContractError
  },
})
