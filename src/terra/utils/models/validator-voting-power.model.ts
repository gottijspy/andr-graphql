import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Validator } from 'src/terra/common/models'

@ObjectType()
export class ValidatorVotingPower {
  @Field(() => Validator)
  validator!: Validator

  @Field(() => Int)
  voting_power!: number

  @Field(() => Int)
  proposer_priority!: number
}
