import { Field, InputType } from '@nestjs/graphql'
import { Pagination } from 'src/common/models'
import { Ado } from './ado.model'

@InputType()
export class AdoSearchResult {
  @Field(() => Pagination)
  pagination!: Pagination

  @Field(() => [Ado])
  ados!: Ado[]
}
