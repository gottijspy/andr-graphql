import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class AddressListAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.AddressList

  @Field(() => [String])
  operators!: string[]

  @Field()
  isInclusive!: boolean
}
