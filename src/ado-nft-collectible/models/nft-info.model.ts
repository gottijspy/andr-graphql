import { Field, ObjectType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'

@ObjectType()
export class NftInfo {
  @Field()
  tokenUri?: string

  @Field(() => AnythingScalar)
  extension!: Promise<any>
}
