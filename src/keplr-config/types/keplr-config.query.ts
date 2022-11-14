import { Field, ObjectType } from '@nestjs/graphql'
import { KeplrConfig } from './keplr-config.schema'

@ObjectType()
export class KeplrConfigQuery {
  @Field(() => [KeplrConfig])
  allConfigs!: Promise<KeplrConfig[]>

  @Field(() => KeplrConfig)
  config!: Promise<KeplrConfig>
}
