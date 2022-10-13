import { Field, ObjectType } from '@nestjs/graphql'
import { ChainConfig } from './chain-config.schema'

@ObjectType()
export class ChainConfigQuery {
  @Field(() => [ChainConfig])
  allConfigs!: Promise<ChainConfig[]>

  @Field(() => ChainConfig)
  config!: Promise<ChainConfig>
}
