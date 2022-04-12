import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrAddressPercent, AndrModule } from 'src/ado-common/models'

@ObjectType({
  implements: () => [BaseAdo],
})
export class SplitterAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Splitter

  @Field(() => [AndrAddressPercent], { nullable: true })
  recipients?: Promise<AndrAddressPercent[]>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
