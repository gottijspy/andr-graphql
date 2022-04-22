import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/terra/common/models'

@ObjectType()
export class StakingPool {
  @Field(() => Coin)
  bonded_tokens!: Coin

  @Field(() => Coin)
  not_bonded_tokens!: Coin
}
