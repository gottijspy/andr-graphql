import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { AdoType } from 'src/ado/types'

export type AdoPackageDocument = AdoPackage & Document

@ObjectType()
export class ADOPSchemaReceive {
  @Field()
  cw721!: string
}

@ObjectType()
export class ADOPSchema {
  @Field()
  execute!: string

  @Field()
  instantiate!: string

  @Field()
  query!: string

  @Field(() => ADOPSchemaReceive, { nullable: true })
  receive?: ADOPSchemaReceive
}

@ArgsType()
export class ADOPArgs {
  @Field(() => AdoType)
  adoType!: AdoType
}

@Schema()
@ObjectType()
export class AdoPackage {
  @Prop({ required: true })
  @Field()
  name!: string

  @Prop({ required: true })
  @Field(() => ADOPSchema)
  schemas!: ADOPSchema
}

export const AdoPackageSchema = SchemaFactory.createForClass(AdoPackage)
