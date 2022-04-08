import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class ReceiptAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Receipt

  @Field()
  minter!: string

  @Field(() => [String], { nullable: true })
  operators?: string[]
}
