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

  //ERR: LCDClientError
  @Field(() => String)
  minter!: Promise<string>

  @Field(() => NftOwnerInfo)
  ownerOf!: Promise<NftOwnerInfo>

  @Field(() => [NftApproval])
  approvedForAll!: Promise<NftApproval[]>

  @Field(() => Int)
  numTokens!: Promise<number>

  @Field(() => NftInfo)
  nftInfo!: Promise<NftInfo>

  @Field(() => AllNftInfo)
  allNftInfo!: Promise<AllNftInfo>

  @Field(() => [String])
  tokens!: Promise<string[]>

  @Field(() => [String])
  allTokens!: Promise<string[]>

  @Field(() => NftContractInfo)
  contractInfo!: Promise<NftContractInfo>
}
