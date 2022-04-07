import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'
import { AndrAddressPercent } from './andr-address-percent.model'
import { AndrModule } from './andr-module.model'

@ObjectType()
export class SplitterAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Splitter

  @Field(() => [AndrAddressPercent], { nullable: true })
  recipients?: Promise<AndrAddressPercent[]>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
