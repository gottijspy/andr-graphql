import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AdoContract, AdoContractError, Coin } from 'src/ado/types'
import { AnythingScalar } from 'src/anything.scalar'
import { AdoType } from './ado.enums'

@ObjectType()
export class NftContract extends AdoContract {
  //FIX: Unknown Variant minter
  @Field(() => String)
  minter!: Promise<string>

  @Field(() => NftOwnerInfo)
  ownerOf!: Promise<NftOwnerInfo>

  @Field(() => [NftApproval])
  allOperators!: Promise<NftApproval[]>

  @Field(() => [NftApproval])
  approvals!: Promise<NftApproval[]>

  @Field(() => NftApproval)
  approval!: Promise<NftApproval>

  @Field(() => Int)
  numTokens!: Promise<number>

  @Field(() => NftInfo)
  nftInfo!: Promise<NftInfo>

  @Field(() => AllNftInfo)
  allNftInfo!: Promise<AllNftInfo>

  @Field(() => Boolean)
  isArchived!: Promise<boolean>

  @Field(() => [String])
  tokens!: Promise<string[]>

  @Field(() => [String])
  allTokens!: Promise<string[]>

  @Field(() => NftContractInfo)
  contractInfo!: Promise<NftContractInfo>
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
  count!: number
}

@ObjectType()
export class NftInfo {
  @Field({ nullable: true })
  tokenUri?: string

  //WARN: extension is of anytype, so attribute selection is not possible
  @Field(() => AnythingScalar, { nullable: true })
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

export const NftContractResult = createUnionType({
  name: 'NftContractResult',
  types: () => [NftContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.NFT) {
      return NftContract
    }

    return AdoContractError
  },
})
