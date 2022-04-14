import { Field, ObjectType } from '@nestjs/graphql'
import { NftOwnerInfo, NftInfo } from '.'

@ObjectType()
export class AllNftInfo {
  @Field(() => NftOwnerInfo)
  access!: Promise<NftOwnerInfo>

  @Field(() => NftInfo)
  info!: Promise<NftInfo>
}
