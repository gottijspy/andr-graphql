import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AndrExpiration } from 'src/ado-common/types'
import { AnythingScalar } from 'src/anything.scalar'

@ObjectType()
export class NftApproval {
  @Field()
  spender!: string

  @Field(() => AndrExpiration)
  expires!: AndrExpiration
}

//ERR: Seems like a typo in ApprovedForAll responsed
// actual: operators, expected: approvals
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
