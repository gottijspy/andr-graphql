import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'
import { AndrModule } from './andr-module.model'

@ObjectType()
export class TimelockAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Timelock

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
