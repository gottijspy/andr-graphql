import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { AndrCoin } from 'src/ado/common/types'

@ObjectType()
export class Primitive {
  @Field(() => Int, { nullable: true })
  uint128?: number

  @Field(() => Float, { nullable: true })
  decimal?: number

  @Field(() => AndrCoin, { nullable: true })
  coin?: AndrCoin

  @Field(() => String, { nullable: true })
  string?: string

  @Field(() => Boolean, { nullable: true })
  bool?: boolean

  @Field(() => [Primitive], { nullable: true })
  vec?: Primitive[]
}

@ObjectType()
export class PrimitiveResponse {
  @Field(() => String)
  key!: string

  @Field(() => Primitive)
  value!: Primitive
}
