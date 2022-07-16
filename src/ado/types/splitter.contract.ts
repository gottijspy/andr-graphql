import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError } from 'src/ado/types/ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class SplitterContract extends AdoContract {
  @Field(() => Splitter)
  config!: Promise<Splitter>
}

@ObjectType()
export class AddressPercent {
  @Field(() => GraphQLJSON)
  recipient?: JSON

  @Field(() => String)
  percent!: string
}

@ObjectType()
export class Splitter {
  @Field(() => [AddressPercent])
  recipients!: AddressPercent[]

  @Field(() => Boolean)
  locked!: boolean
}

export const SplitterContractResult = createUnionType({
  name: 'SplitterContractResult',
  types: () => [SplitterContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Splitter) {
      return SplitterContract
    }

    return AdoContractError
  },
})
