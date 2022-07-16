import { Field, ObjectType, createUnionType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { AdoContract, AdoContractError } from './ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class PrimitiveContract extends AdoContract {
  @Field(() => PrimitiveResponse)
  getValue!: Promise<PrimitiveResponse>
}

@ObjectType()
export class PrimitiveResponse {
  @Field(() => String, { nullable: true })
  key?: string

  @Field(() => GraphQLJSON, { nullable: true })
  value?: JSON
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
