import { Field, ObjectType } from '@nestjs/graphql'
import { AndrModule } from 'src/ado/common/models'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class TimelockAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Timelock

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
