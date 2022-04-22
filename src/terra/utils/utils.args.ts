import { ArgsType, Field } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/terra/common/arguments/base.args'
import { Coin } from 'src/terra/common/models'

@ArgsType()
export class GetUtilsArgs extends GetBaseArgs {
  @Field(() => Coin)
  coin!: Coin
}
