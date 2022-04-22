import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AndrExpiration {
  @Field(() => Int, { nullable: true })
  at_height?: number

  @Field({ nullable: true })
  at_time?: string
}
