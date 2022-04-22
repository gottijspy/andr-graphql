import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/common/interfaces'
import { AndrModule } from 'src/ado/common/models'

@ObjectType({
  implements: () => [BaseAdo],
})
export class TimelockAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Timelock

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
