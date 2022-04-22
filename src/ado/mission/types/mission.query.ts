import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { MissionComponent, MissionConfig } from '.'

@ObjectType()
export class MissionQuery implements BaseQuery, AndrQuery {
  @Field()
  contractAddress!: string

  @Field(() => String)
  owner!: Promise<string>

  @Field(() => [String])
  operators!: Promise<string[]>

  @Field(() => Boolean)
  isOperator!: Promise<boolean>

  //ERR: Able to pull addresses for Anchor and Crowfund only, others aren't working
  @Field(() => String)
  getAddress!: Promise<string>

  @Field(() => [String])
  getAddresses!: Promise<string[]>

  @Field(() => [MissionComponent])
  getComponents!: Promise<MissionComponent[]>

  @Field(() => MissionConfig)
  config!: Promise<MissionConfig>
}
