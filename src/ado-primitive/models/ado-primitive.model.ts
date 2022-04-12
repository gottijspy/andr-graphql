import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class PrimitiveAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Primitive

  @Field(() => [String])
  operators!: string[]
}
