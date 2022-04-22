import { Field, ObjectType } from '@nestjs/graphql'
import { AndrAddress } from '.'

@ObjectType()
export class AndrADORecipient {
  @Field(() => AndrAddress)
  address!: Promise<AndrAddress>

  @Field({ nullable: true })
  msg?: string
}

@ObjectType()
export class AndrRecipient {
  @Field({ nullable: true })
  addr?: string

  @Field(() => AndrADORecipient, { nullable: true })
  a_d_o?: AndrADORecipient
}
