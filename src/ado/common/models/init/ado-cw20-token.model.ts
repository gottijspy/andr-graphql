import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/common/interfaces'
import { AndrCW20Coin, AndrMarketingInfo, AndrMinterResponse, AndrModule } from 'src/ado/common/models'

@ObjectType({
  implements: () => [BaseAdo],
})
@ObjectType()
export class CW20TokenAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string // = AdoType.Token

  // @Field()
  // primitiveContract!: string

  @Field()
  name!: string

  @Field()
  symbol!: string

  @Field(() => Int)
  decimals!: number

  @Field(() => [AndrCW20Coin])
  initial_balances!: AndrCW20Coin[]

  @Field(() => AndrMinterResponse, { nullable: true })
  mint?: AndrMinterResponse

  @Field(() => AndrMarketingInfo, { nullable: true })
  marketing?: AndrMarketingInfo

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
