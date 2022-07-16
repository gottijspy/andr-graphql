import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class AddresslistContract extends AdoContract {
  @Field(() => AddresslistResponse)
  includesAddress!: Promise<AddresslistResponse>
}

@ObjectType()
export class AddresslistResponse {
  @Field(() => Boolean)
  included!: boolean
}

export const AddresslistContractResult = createUnionType({
  name: 'AddresslistContractResult',
  types: () => [AddresslistContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Addresslist) {
      return AddresslistContract
    }

    return AdoContractError
  },
})
