import { Field, ObjectType } from '@nestjs/graphql'
import { AndrStrategyType } from 'src/ado/enums'

@ObjectType()
export class AndrYieldStrategy {
  @Field(() => AndrStrategyType)
  strategy_type!: string

  @Field()
  address!: string
}
