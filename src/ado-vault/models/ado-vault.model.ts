import { ObjectType, Field } from '@nestjs/graphql'
import { AndrYieldStrategy } from 'src/ado/common/models'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
@ObjectType()
export class VaultAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string // = AdoType.Token

  @Field(() => [String], { nullable: true })
  operators?: string[]

  @Field(() => [AndrYieldStrategy])
  strategies!: Promise<AndrYieldStrategy[]>
}
