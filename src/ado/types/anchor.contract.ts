import { createUnionType, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from './ado.contract'
import { AdoType } from './ado.enums'

@ObjectType()
export class AnchorContract extends AdoContract {
  //WARN: Anchor queries need to be defined
}

export const AnchorContractResult = createUnionType({
  name: 'AnchorContractResult',
  types: () => [AnchorContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Anchor) {
      return AnchorContract
    }

    return AdoContractError
  },
})
