import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class AndrCW20Coin {
  @Field()
  address!: string

  @Field(() => Int)
  amount!: number
}
