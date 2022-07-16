import { createUnionType, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from './ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class ReceiptContract extends AdoContract {
  //WARN: Auction queries need to be defined
}

export const ReceiptContractResult = createUnionType({
  name: 'ReceiptContractResult',
  types: () => [ReceiptContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Auction) {
      return ReceiptContract
    }

    return AdoContractError
  },
})
