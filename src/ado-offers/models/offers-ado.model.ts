import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class OffersAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.AdoOffers

  @Field()
  andrCW721Contract!: string
}
