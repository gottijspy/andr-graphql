import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class AnchorAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.AdoOffers

  @Field()
  primitiveContract!: string
}
