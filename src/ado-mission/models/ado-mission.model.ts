import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrMissionComponent } from 'src/ado-common/models'

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

  @Field(() => [AndrMissionComponent])
  mission!: Promise<AndrMissionComponent[]>

  @Field()
  name!: string

  @Field()
  primitiveContract!: string
}
