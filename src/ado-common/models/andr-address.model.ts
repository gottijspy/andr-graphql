import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AndrAddress {
  @Field()
  identifier!: string
}
