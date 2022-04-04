import { Field, ObjectType } from '@nestjs/graphql'
import { AndrModule } from './andr-module.model'

@ObjectType()
export class Ado {
  @Field()
  adoType!: string

  @Field({ nullable: true })
  primitiveContract?: string

  @Field(() => [String], { nullable: true })
  operators?: string[]

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
