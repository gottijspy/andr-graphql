import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'
import { AndrMissionComponent } from './andr-mission-component.model'

@ObjectType()
export class MissionAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Mission

  @Field()
  primitiveContract!: string

  @Field(() => [String])
  operators!: string[]

  @Field(() => [AndrMissionComponent])
  mission!: Promise<AndrMissionComponent[]>

  @Field()
  name!: string
}
