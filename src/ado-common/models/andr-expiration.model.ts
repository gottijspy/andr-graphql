import { Field, ObjectType } from '@nestjs/graphql'
import { AndrExpirationType } from '../enums'

@ObjectType()
export class AndrExpiration {
  @Field(() => AndrExpirationType)
  expirationType!: string

  @Field()
  expirationValue!: string
}
