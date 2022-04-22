import { Field, ObjectType } from '@nestjs/graphql'
import { Coin, MarketParams } from 'src/terra/common/models'

@ObjectType()
export class Market {
  @Field(() => Coin)
  swapRate!: Promise<Coin>

  @Field(() => String)
  terraPoolDelta!: Promise<string>

  @Field(() => MarketParams)
  parameters!: Promise<MarketParams>
}
