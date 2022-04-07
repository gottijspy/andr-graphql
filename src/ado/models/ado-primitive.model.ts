import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'

@ObjectType()
export class PrimitiveAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Primitive

  @Field(() => [String])
  operators!: string[]
}
