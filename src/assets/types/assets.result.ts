import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AssetResult {
  @Field({ nullable: true })
  adoType?: string

  @Field({ nullable: true })
  contractAddress?: string

  @Field(() => Int, { nullable: true })
  height?: number

  @Field({ nullable: true })
  timestamp?: string
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  offset = 0

  @Field(() => Int)
  limit = 10
}
