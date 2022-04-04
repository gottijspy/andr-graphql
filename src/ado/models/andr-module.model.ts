import { Field, ObjectType } from '@nestjs/graphql'
import { AndrModuleType } from 'src/common/enums'
import { AndrAddress } from './andr-address.model'

@ObjectType()
export class AndrModule {
  // enum value stored under src/common/enums
  @Field(() => AndrModuleType)
  moduleType!: number

  @Field(() => AndrAddress)
  address!: Promise<AndrAddress>

  @Field()
  isMutable!: boolean
}
