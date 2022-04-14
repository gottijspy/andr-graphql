import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class NftContractInfo {
  @Field()
  name!: string

  @Field()
  symbol!: string
}
