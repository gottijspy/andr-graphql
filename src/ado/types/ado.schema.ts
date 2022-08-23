// {
//   "_id": {
//     "$oid": "62f6653140b399c56a034d13"
//   },
//   "owner": "stars1mwuy5d79tlsdsspg4d7yr0aasa8lj9h8xqgey9",
//   "address": "stars1muv46s9g8gkd5zptudj8e3nww6d0lzckkzpvllq0wqng9xjnklvqx5vzyw",
//   "adoType": "factory",
//   "instantiateHeight": 541743,
//   "instantiateHash": "232705CF45B551241D9E89C47370E610BACC97C1F56699B92CF2CED1BAE37269",
//   "lastUpdatedHash": "232705CF45B551241D9E89C47370E610BACC97C1F56699B92CF2CED1BAE37269",
//   "lastUpdatedHeight": 541743,
//   "appContract": null,
//   "chainId": "elgafar-1"
// }

import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type AdoDocument = Ado & Document

@Schema()
@ObjectType()
export class Ado {
  @Field(() => ID)
  _id!: number

  @Prop({ reruired: true })
  @Field()
  owner!: string

  @Prop({ reruired: true })
  @Field()
  address!: string

  @Prop({ reruired: true })
  @Field()
  adoType!: string

  @Prop()
  @Field(() => Int, { nullable: true })
  instantiateHeight?: number

  @Prop()
  @Field(() => Int, { nullable: true })
  lastUpdatedHeight?: number

  @Prop()
  @Field({ nullable: true })
  instantiateHash?: string

  @Prop()
  @Field({ nullable: true })
  lastUpdatedHash?: string

  @Prop()
  @Field({ nullable: true })
  appContract?: string

  @Prop()
  @Field({ nullable: true })
  chainId?: string
}

export const AdoSchema = SchemaFactory.createForClass(Ado)
