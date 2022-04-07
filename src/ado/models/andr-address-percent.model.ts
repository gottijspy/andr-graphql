import { Field, Float, ObjectType } from '@nestjs/graphql'
import { AndrRecipient } from './andr-recipient.model'

@ObjectType()
export class AndrAddressPercent {
  @Field(() => AndrRecipient)
  recipient!: AndrRecipient

  @Field(() => Float)
  percent!: number
}
