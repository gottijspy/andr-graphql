import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MissionComponent {
  @Field()
  name!: string

  @Field()
  ado_type!: string

  @Field()
  instantiate_msg!: string
}

@ObjectType()
export class MissionConfig {
  @Field()
  name!: string

  @Field()
  owner!: string
}
