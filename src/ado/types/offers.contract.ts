import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class OffersContract extends AdoContract {
  //ERR: LCDClientError
  @Field(() => OfferResponse)
  offer!: Promise<OfferResponse>

  @Field(() => [OfferResponse])
  allOffers!: Promise<OfferResponse[]>
}

@ObjectType()
export class OfferResponse {
  @Field()
  denom!: string

  @Field(() => Int)
  offerAmount!: number

  @Field(() => Int)
  remainingAmount!: number

  @Field(() => Int)
  taxAmount!: number

  @Field(() => GraphQLJSON)
  expiration!: JSON

  @Field()
  purchaser!: string
}

export const OffersContractResult = createUnionType({
  name: 'OffersContractResult',
  types: () => [OffersContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Offers) {
      return OffersContract
    }

    return AdoContractError
  },
})
