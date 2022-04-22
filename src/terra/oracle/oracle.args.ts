import { Field, ArgsType } from '@nestjs/graphql'
import { ValAddress } from 'nestjs-terra'
import { GetBaseArgs } from 'src/terra/common/arguments/base.args'
import { Denom } from 'src/terra/common/enums'

@ArgsType()
export class GetOracleArgs extends GetBaseArgs {
  @Field(() => ValAddress, { nullable: true })
  validator?: ValAddress

  @Field(() => String, { nullable: true })
  denom?: Denom
}
