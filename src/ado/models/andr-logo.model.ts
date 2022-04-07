import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AndrLogo {
  @Field()
  link!: string

  @Field()
  mimeType!: string

  @Field()
  data!: string
}
