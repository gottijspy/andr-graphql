import { Field, ObjectType } from '@nestjs/graphql'
import { AndrExpiration } from 'src/ado-common/models'

@ObjectType()
export class NftApproval {
  @Field()
  spender!: string

  @Field(() => AndrExpiration)
  expires!: AndrExpiration
}
