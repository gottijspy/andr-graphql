import { Field, InputType, Int } from '@nestjs/graphql'
import { AndrModule } from './andr-module.model'

@InputType()
export class AndrSearchOptions {
  @Field(() => Int)
  limit!: number

  @Field(() => Int)
  page!: number

  @Field()
  adoType!: string

  @Field({ nullable: true })
  primitiveContract?: string

  @Field(() => [String], { nullable: true })
  operators?: string[]

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
