import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrCoin, AndrExpiration } from 'src/ado/common/types'
import { AnythingScalar } from 'src/anything.scalar'

@ObjectType()
export class NftApproval {
  @Field()
  spender!: string

  @Field(() => AndrExpiration)
  expires!: AndrExpiration
}

@ObjectType()
export class NftApprovedForAll {
  @Field(() => [NftApproval])
  operators!: Promise<NftApproval[]>
}

@ObjectType()
export class NftOwnerInfo {
  @Field()
  owner!: string

  @Field(() => [NftApproval])
  approvals!: Promise<NftApproval[]>
}

@ObjectType()
export class NftContractInfo {
  @Field()
  name!: string

  @Field()
  symbol!: string
}

@ObjectType()
export class NftNumTokens {
  @Field(() => Int)
  count!: number
}

@ObjectType()
export class NftInfo {
  @Field({ nullable: true })
  tokenUri?: string

  //WARN: extension is of anytype, so attribute selection is not possible
  @Field(() => AnythingScalar)
  extension!: Promise<any>
}

@ObjectType()
export class AllNftInfo {
  @Field(() => NftOwnerInfo)
  access!: Promise<NftOwnerInfo>

  @Field(() => NftInfo)
  info!: Promise<NftInfo>
}

@ObjectType()
export class AgreementAmount {
  @Field(() => AndrCoin)
  raw!: AndrCoin
}

@ObjectType()
export class Agreement {
  @Field(() => AgreementAmount)
  amount!: AgreementAmount

  @Field(() => String)
  purchaser!: string
}

@ObjectType()
export class TransferAgreement {
  @Field(() => String)
  tokenId!: string

  @Field(() => Agreement)
  agreement!: Agreement
}
