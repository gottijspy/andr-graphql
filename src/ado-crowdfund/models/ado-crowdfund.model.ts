import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrAddress, AndrModule } from 'src/ado-common/models'

@ObjectType({
  implements: () => [BaseAdo],
})
export class CrowdfundAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Crowdfund

  @Field(() => AndrAddress)
  tokenAddress!: Promise<AndrAddress>

  @Field()
  canMintAfterSale!: boolean

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>

  @Field()
  primitiveContract!: string
}
