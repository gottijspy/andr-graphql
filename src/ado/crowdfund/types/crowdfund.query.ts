import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { CrowdfundConfig, CrowdfundState } from './crowdfund.response'

@ObjectType()
export class CrowdfundQuery implements BaseQuery, AndrQuery {
  @Field(() => String)
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  @Field(() => CrowdfundState)
  state!: Promise<CrowdfundState>

  @Field(() => CrowdfundConfig)
  config!: Promise<CrowdfundConfig>
}
