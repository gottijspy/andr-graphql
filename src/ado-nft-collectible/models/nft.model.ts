import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAndrQuery } from 'src/ado-common/interfaces'
import { NftOwnerInfo, NftApproval, NftContractInfo, NftInfo, AllNftInfo } from '.'

@ObjectType()
export class NFT implements BaseAndrQuery {
  @Field(() => NftOwnerInfo)
  ownerOf!: Promise<NftOwnerInfo>

  @Field(() => [NftApproval])
  approvals!: Promise<NftApproval[]>

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

  @Field(() => String)
  minter!: Promise<string>

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>
}
