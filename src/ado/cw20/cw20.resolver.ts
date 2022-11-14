import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CW20Service } from './cw20.service'
import { CW20Ado, TokenInfo } from './types'

@Resolver(CW20Ado)
export class CW20Resolver {
  constructor(private readonly cw20Service: CW20Service) {}

  @ResolveField(() => TokenInfo)
  public async tokenInfo(@Parent() token: CW20Ado): Promise<TokenInfo> {
    return this.cw20Service.tokenInfo(token.address)
  }
}
