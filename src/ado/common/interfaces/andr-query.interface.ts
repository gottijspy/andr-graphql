import { Field, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class AndrQuery {
  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>
}