import { Field, ObjectType } from '@nestjs/graphql'
import { PublicKeyUnion, PublicKeyType } from 'src/terra/common/unions'

@ObjectType()
export class StdSignature {
  @Field()
  signature!: string

  @Field(() => PublicKeyUnion, { nullable: true })
  pub_key?: PublicKeyType | null
}
