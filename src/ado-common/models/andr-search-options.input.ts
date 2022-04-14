import { Field, InputType, Int } from '@nestjs/graphql'
import { AndrOrderBy } from '../enums'
//import { AndrModule } from '../models/andr-module.model'

@InputType()
export class AndrSearchOptions {
  @Field(() => Int, { nullable: true })
  limit?: number = 10

  @Field(() => Int, { nullable: true })
  startAfter?: number = 0

  @Field(() => AndrOrderBy, { nullable: true })
  orderBy?: string = AndrOrderBy.Asc

  // @Field({ nullable: true })
  // adoType?: string

  // @Field({ nullable: true })
  // primitiveContract?: string

  // @Field(() => [String], { nullable: true })
  // operators?: string[]

  // @Field(() => [AndrModule], { nullable: true })
  // modules?: Promise<AndrModule[]>
}
