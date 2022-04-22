import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AddressListResponse {
  @Field(() => Boolean)
  included!: boolean
}
