import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class AddressListAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.AddressList

  @Field(() => [String])
  operators!: string[]

  @Field()
  isInclusive!: boolean
}
