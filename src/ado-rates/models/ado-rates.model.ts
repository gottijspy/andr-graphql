import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrRateInfo } from 'src/ado-common/models'

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

  @Field(() => [AndrRateInfo])
  rates!: Promise<AndrRateInfo[]>
}
