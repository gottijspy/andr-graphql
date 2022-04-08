import { Field, ObjectType } from '@nestjs/graphql'
import { AndrAddress, AndrModule } from 'src/ado/common/models'
import { BaseAdo } from 'src/ado/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class CrowdfundAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Crowdfund

  @Field()
  primitiveContract!: string

  @Field(() => AndrAddress)
  tokenAddress!: Promise<AndrAddress>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
