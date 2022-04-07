import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'
import { AndrRateInfo } from './andr-rate-info.model'

@ObjectType()
export class RatesAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Rates

  @Field(() => [AndrRateInfo], { nullable: true })
  rates?: Promise<AndrRateInfo[]>
}
