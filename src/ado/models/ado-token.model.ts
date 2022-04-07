import { ObjectType, Field, Int } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'
import { AndrCW20Coin } from './andr-cw20-coin.model'
import { AndrMarketingInfo } from './andr-marketing-info.model'
import { AndrMinterResponse } from './andr-minter-response.model'
import { AndrModule } from './andr-module.model'

@ObjectType()
export class TokenAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Token

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

  @Field()
  primitiveContract!: string
}
