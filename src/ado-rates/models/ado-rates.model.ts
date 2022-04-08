import { Field, ObjectType } from '@nestjs/graphql'
import { AndrRateInfo } from 'src/ado/common/models'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class RatesAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Rates

  @Field(() => [AndrRateInfo], { nullable: true })
  rates?: Promise<AndrRateInfo[]>
}
