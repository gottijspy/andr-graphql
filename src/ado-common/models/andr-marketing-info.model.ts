import { Field, ObjectType } from '@nestjs/graphql'
import { AndrLogo } from './andr-logo.model'

@ObjectType()
export class AndrMarketingInfo {
  @Field({ nullable: true })
  project?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  marketing?: string

  @Field(() => AndrLogo, { nullable: true })
  logo?: AndrLogo
}
