import { Field, InputType, Int } from '@nestjs/graphql'
import { AndrOrderBy } from '../andr-query/types'

@InputType()
export class AndrSearchOptions {
  @Field(() => Int, { nullable: true })
  limit?: number = 10

  @Field(() => AndrOrderBy, { nullable: true })
  orderBy?: string = AndrOrderBy.Asc

  @Field(() => String, { nullable: true })
  startAfter?: string = ''
}
