import { Field, ObjectType } from '@nestjs/graphql'
import { AndrAddress } from './andr-address.model'

@ObjectType()
export class AdoRecipient {
  @Field(() => AndrAddress)
  address!: Promise<AndrAddress>

  @Field({ nullable: true })
  msg?: string
}
