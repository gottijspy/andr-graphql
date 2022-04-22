import { Field, ObjectType, InputType } from '@nestjs/graphql'
import { Coins as TerraCoins, Coin as TerraCoin } from 'nestjs-terra'

@InputType('AndrCoinInput')
@ObjectType('AndrCoin')
export class AndrCoin {
  @Field()
  denom!: string

  @Field()
  amount!: string

  public static fromTerraCoins(coins: TerraCoins): AndrCoin[] {
    return coins.toArray().map<AndrCoin>(AndrCoin.fromTerraCoin)
  }

  public static fromTerraCoin(coin: TerraCoin): AndrCoin {
    return {
      denom: coin.denom,
      amount: coin.amount.toString(),
    }
  }
}
