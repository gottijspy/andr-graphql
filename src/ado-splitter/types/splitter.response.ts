import { Field, ObjectType } from '@nestjs/graphql'
import { AndrRecipient } from 'src/ado-common/types'

@ObjectType()
export class AddressPercent {
  @Field(() => AndrRecipient)
  recipient!: AndrRecipient

  @Field(() => String)
  percent!: string
}

@ObjectType()
export class Splitter {
  @Field(() => [AddressPercent])
  recipients!: AddressPercent[]

  @Field(() => Boolean)
  locked!: boolean
}
