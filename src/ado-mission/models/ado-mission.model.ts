import { Field, ObjectType } from '@nestjs/graphql'
import { AndrMissionComponent } from 'src/ado/common/models'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class MissionAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Mission

  @Field()
  primitiveContract!: string

  @Field(() => [String])
  operators!: string[]

  @Field(() => [AndrMissionComponent])
  mission!: Promise<AndrMissionComponent[]>

  @Field()
  name!: string
}
