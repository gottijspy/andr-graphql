import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class OffersContract extends AdoContract {
  //ERR: LCDClientError
  @Field(() => OfferResponse, { nullable: true })
  offer?: Promise<OfferResponse>

  @Field(() => [OfferResponse], { nullable: true })
  allOffers?: Promise<OfferResponse[]>
}

@ObjectType()
export class OfferResponse {
  @Field({ nullable: true })
  denom?: string

  @Field(() => Int, { nullable: true })
  offerAmount?: number

  @Field(() => Int, { nullable: true })
  remainingAmount?: number

  @Field(() => Int, { nullable: true })
  taxAmount?: number

  @Field(() => GraphQLJSON, { nullable: true })
  expiration?: JSON

  @Field({ nullable: true })
  purchaser?: string
}

export const OffersResult = createUnionType({
  name: 'OffersResult',
  types: () => [OffersContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.Offers) {
      return OffersContract
    }

    return AdoContractError
  },
})
