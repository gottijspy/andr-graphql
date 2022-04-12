import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrAddress, AndrModule } from 'src/ado-common/models'

@ObjectType({
  implements: () => [BaseAdo],
})
export class NftCollectibleAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Crowdfund

  @Field()
  name!: string

  @Field()
  symbol!: string

  @Field(() => AndrAddress)
  minter!: Promise<AndrAddress>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
