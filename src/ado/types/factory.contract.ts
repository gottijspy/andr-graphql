import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AdoContract } from 'src/ado/types'

@ObjectType()
export class FactoryContract extends AdoContract {
  @Field(() => Int, { nullable: true })
  code_id?: Promise<number>
}
