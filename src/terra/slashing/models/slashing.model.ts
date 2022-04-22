import { Field, ObjectType } from '@nestjs/graphql'
import { SlashingParams } from 'src/terra/common/models'
import { SigningInfo } from './signing-info.model'

@ObjectType()
export class Slashing {
  @Field(() => [SigningInfo])
  signingInfos!: Promise<SigningInfo[]>

  @Field(() => SlashingParams)
  parameters!: Promise<SlashingParams>
}
