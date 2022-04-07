import { Field, ObjectType } from '@nestjs/graphql'
import { Int } from 'nestjs-terra'

@ObjectType()
export class AndrMinterResponse {
  @Field()
  minter!: string

  @Field(() => Int, { nullable: true })
  cap?: Int
}
