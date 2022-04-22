import { ArgsType, Field, Int } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/terra/common/arguments/base.args'

@ArgsType()
export class GetGovArgs extends GetBaseArgs {
  @Field(() => Int)
  proposalId!: number
}
