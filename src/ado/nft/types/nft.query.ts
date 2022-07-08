import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { NftOwnerInfo, NftContractInfo, NftInfo, AllNftInfo, NftApproval } from '.'

@ObjectType()
export class NftQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  //ERR: LCDClientError
  @Field(() => String)
  owner!: Promise<string>

  //ERR: LCDClientError
  @Field(() => [String])
  operators!: Promise<string[]>

  //ERR: LCDClientError
  @Field(() => Boolean)
  isOperator!: Promise<boolean>

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
