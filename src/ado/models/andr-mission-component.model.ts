import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AndrMissionComponent {
  @Field()
  name!: string

  @Field()
  adoType!: string

  @Field()
  instantiateMsg!: string
}
