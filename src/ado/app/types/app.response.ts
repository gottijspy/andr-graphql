import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppComponent {
  @Field()
  name!: string

  @Field()
  ado_type!: string

  @Field()
  instantiate_msg!: string
}

@ObjectType()
export class AppConfig {
  @Field()
  name!: string

  @Field()
  owner!: string
}

@ObjectType()
export class AppComponentAddress {
  @Field()
  name!: string

  @Field()
  address!: string
}
