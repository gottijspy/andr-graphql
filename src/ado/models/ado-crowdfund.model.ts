import { Field } from '@nestjs/graphql'
import { AdoType } from 'src/common/enums'
import { BaseAdo } from './ado.model'
import { AndrAddress } from './andr-address.model'
import { AndrModule } from './andr-module.model'

export class CrowdfundAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  readonly adoType = AdoType.Crowdfund

  @Field()
  primitiveContract!: string

  @Field(() => AndrAddress)
  tokenAddress!: Promise<AndrAddress>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
