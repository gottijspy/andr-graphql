import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AndrRecipient } from 'src/ado/common/types'
import { AdoContract, AdoContractError } from 'src/ado/types/ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class SplitterContract extends AdoContract {
  @Field(() => Splitter)
  config!: Promise<Splitter>
}

@ObjectType()
export class AddressPercent {
  @Field(() => AndrRecipient)
  recipient!: AndrRecipient

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
