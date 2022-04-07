import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'

@ObjectType()
export class AddressListAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.AddressList

  @Field(() => [String])
  operators!: string[]

  @Field()
  isInclusive!: boolean
}
