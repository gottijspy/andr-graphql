import { createUnionType, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from './ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class AuctionContract extends AdoContract {
  //WARN: Auction queries need to be defined
}

export const AuctionResult = createUnionType({
  name: 'AuctionResult',
  types: () => [AuctionContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Auction) {
      return AuctionContract
    }

    return AdoContractError
  },
})
