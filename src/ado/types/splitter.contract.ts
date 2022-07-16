import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError } from 'src/ado/types/ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class SplitterContract extends AdoContract {
  @Field(() => Splitter, { nullable: true })
  config?: Promise<Splitter>
}

@ObjectType()
export class AddressPercent {
  @Field(() => GraphQLJSON, { nullable: true })
  recipient?: JSON

  @Field(() => String, { nullable: true })
  percent?: string
}

@ObjectType()
export class Splitter {
  @Field(() => [AddressPercent], { nullable: true })
  recipients?: AddressPercent[]

  @Field(() => Boolean, { nullable: true })
  locked?: boolean
}

export const SplitterResult = createUnionType({
  name: 'SplitterResult',
  types: () => [SplitterContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Splitter) {
      return SplitterContract
    }

    return AdoContractError
  },
})
