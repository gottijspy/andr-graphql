import { Field, ObjectType } from '@nestjs/graphql'
import { NftApproval } from '.'

@ObjectType()
export class NftOwnerInfo {
  @Field()
  owner!: string

  @Field(() => [NftApproval])
  approvals!: Promise<NftApproval[]>
}
