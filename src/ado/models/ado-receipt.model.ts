import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'

@ObjectType()
export class ReceiptAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Receipt

  @Field()
  minter!: string

  @Field(() => [String], { nullable: true })
  operators?: string[]
}
