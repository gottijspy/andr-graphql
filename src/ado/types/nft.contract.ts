import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError, Coin } from 'src/ado/types'
import { AdoType } from './ado.enums'

@ObjectType()
export class NftContract extends AdoContract {
  //FIX: Unknown Variant minter
  @Field(() => String, { nullable: true })
  minter?: Promise<string>

  @Field(() => NftOwnerInfo, { nullable: true })
  ownerOf?: Promise<NftOwnerInfo>

  @Field(() => [NftApproval], { nullable: true })
  allOperators?: Promise<NftApproval[]>

  @Field(() => [NftApproval], { nullable: true })
  approvals?: Promise<NftApproval[]>

  @Field(() => NftApproval, { nullable: true })
  approval?: Promise<NftApproval>

  @Field(() => Int, { nullable: true })
  numTokens?: Promise<number>

  @Field(() => NftInfo, { nullable: true })
  nftInfo?: Promise<NftInfo>

  @Field(() => AllNftInfo, { nullable: true })
  allNftInfo?: Promise<AllNftInfo>

  @Field(() => Boolean, { nullable: true })
  isArchived?: Promise<boolean>

  @Field(() => [String], { nullable: true })
  tokens?: Promise<string[]>

  @Field(() => [String], { nullable: true })
  allTokens?: Promise<string[]>

  @Field(() => NftContractInfo, { nullable: true })
  contractInfo?: Promise<NftContractInfo>
}

@ObjectType()
export class NftApproval {
  @Field({ nullable: true })
  spender?: string

  @Field(() => GraphQLJSON, { nullable: true })
  expires?: JSON
}

@ObjectType()
export class NftApprovedForAll {
  @Field(() => [NftApproval], { nullable: true })
  operators?: Promise<NftApproval[]>
}

@ObjectType()
export class NftOwnerInfo {
  @Field({ nullable: true })
  owner?: string

  @Field(() => [NftApproval], { nullable: true })
  approvals?: Promise<NftApproval[]>
}

@ObjectType()
export class NftContractInfo {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  symbol?: string
}

@ObjectType()
export class NftNumTokens {
  @Field(() => Int, { nullable: true })
  count?: number
}

@ObjectType()
export class NftInfo {
  @Field({ nullable: true })
  tokenUri?: string

  //WARN: extension is of anytype, so attribute selection is not possible
  @Field(() => GraphQLJSON, { nullable: true })
  extension?: Promise<any>
}

@ObjectType()
export class AllNftInfo {
  @Field(() => NftOwnerInfo, { nullable: true })
  access?: Promise<NftOwnerInfo>

  @Field(() => NftInfo, { nullable: true })
  info?: Promise<NftInfo>
}

@ObjectType()
export class AgreementAmount {
  @Field(() => Coin, { nullable: true })
  raw?: Coin
}

@ObjectType()
export class Agreement {
  @Field(() => AgreementAmount, { nullable: true })
  amount?: AgreementAmount

  @Field(() => String, { nullable: true })
  purchaser?: string
}

@ObjectType()
export class TransferAgreement {
  @Field(() => String, { nullable: true })
  tokenId?: string

  @Field(() => Agreement, { nullable: true })
  agreement?: Agreement
}

export const NftResult = createUnionType({
  name: 'NftResult',
  types: () => [NftContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.NFT) {
      return NftContract
    }

    return AdoContractError
  },
})
