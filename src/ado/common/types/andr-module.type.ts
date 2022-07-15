import { Field, ObjectType } from '@nestjs/graphql'
import { AndrModuleType } from 'src/ado/types/ado.enums'
import { AndrAddress } from '../types'

@ObjectType()
export class AndrModule {
  // enum value stored under src/common/enums
  @Field(() => AndrModuleType)
  moduleType!: string

  @Field(() => AndrAddress)
  address!: Promise<AndrAddress>

  @Field()
  isMutable!: boolean
}
