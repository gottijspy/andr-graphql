import { Field, ObjectType } from '@nestjs/graphql'
import { Int } from 'nestjs-terra'

@ObjectType()
export class AndrCW20Coin {
  @Field()
  address!: string

  @Field(() => Int)
  amount!: Int
}
