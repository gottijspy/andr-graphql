import { Field, ObjectType } from '@nestjs/graphql'
import { ValAddress } from 'nestjs-terra'
import { Coin } from 'src/terra/common/models'

@ObjectType()
export class RewardItem {
  @Field(() => String)
  validator_address!: ValAddress

  @Field(() => [Coin])
  reward!: Coin[]
}
