import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class AddresslistContract extends AdoContract {
  @Field(() => AddresslistResponse, { nullable: true })
  includesAddress?: Promise<AddresslistResponse>
}

@ObjectType()
export class AddresslistResponse {
  @Field(() => Boolean, { nullable: true })
  included?: boolean
}

export const AddresslistResult = createUnionType({
  name: 'AddresslistResult',
  types: () => [AddresslistContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.AddressList) {
      return AddresslistContract
    }

    return AdoContractError
  },
})
