import { Field, ObjectType } from '@nestjs/graphql'
import { AndrQuery, BaseQuery } from 'src/ado/common/interfaces'
import { AppComponent, AppConfig, AppComponentAddress } from '.'

@ObjectType()
export class AppQuery implements BaseQuery, AndrQuery {
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

  @Field(() => [AppComponentAddress])
  getAddresses!: Promise<AppComponentAddress[]>

  @Field(() => [AppComponent])
  getComponents!: Promise<AppComponent[]>

  @Field(() => AppConfig)
  config!: Promise<AppConfig>
}
