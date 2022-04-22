import { ObjectType, Field } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/common/interfaces'
import { AndrYieldStrategy } from 'src/ado/common/models'

@ObjectType({
  implements: () => [BaseAdo],
})
@ObjectType()
export class VaultAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string // = AdoType.Token

  @Field(() => [String], { nullable: true })
  operators?: string[]

  @Field(() => [AndrYieldStrategy])
  strategies!: Promise<AndrYieldStrategy[]>
}
