import { Field, ObjectType } from '@nestjs/graphql'
import { AndrRateType } from 'src/common/enums'
import { AndrRecipient } from './andr-recipient.model'

@ObjectType()
export class AndrRateInfo {
  @Field(() => AndrRateType)
  rate!: string

  @Field()
  isAdditive!: boolean

  @Field()
  description?: string

  @Field(() => [AndrRecipient])
  receivers!: AndrRecipient[]
}
