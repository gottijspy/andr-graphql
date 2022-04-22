import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado/common/interfaces'
import { RateInfo } from 'src/ado/rates/types/rates.response'

@ObjectType({
  implements: () => [BaseAdo],
})
export class RatesAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Rates

  @Field(() => [RateInfo])
  rates!: Promise<RateInfo[]>
}
