import { Field, ObjectType } from '@nestjs/graphql'
import { AndrStrategyType } from 'src/ado/common/enums'

@ObjectType()
export class AndrYieldStrategy {
  @Field(() => AndrStrategyType)
  strategyType!: string

  @Field()
  address!: string
}
