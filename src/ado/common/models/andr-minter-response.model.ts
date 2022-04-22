import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class AndrMinterResponse {
  @Field()
  minter!: string

  @Field(() => Int, { nullable: true })
  cap?: number
}
