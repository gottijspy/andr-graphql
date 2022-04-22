import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrModule } from 'src/ado-common/models'
import { AddressPercent } from 'src/ado-splitter/types/splitter.response'

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

  @Field(() => [AddressPercent], { nullable: true })
  recipients?: Promise<AddressPercent[]>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
