import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/common/interfaces'
import { MissionComponent } from 'src/ado/mission/types/mission.response'

@ObjectType({
  implements: () => [BaseAdo],
})
export class MissionAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Mission

  @Field(() => [String])
  operators!: string[]

  @Field(() => [MissionComponent])
  mission!: Promise<MissionComponent[]>

  @Field()
  name!: string

  @Field()
  primitiveContract!: string
}
