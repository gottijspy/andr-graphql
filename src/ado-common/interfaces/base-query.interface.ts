import { Field, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class BaseQuery {
  @Field()
  contractAddress!: string
}
