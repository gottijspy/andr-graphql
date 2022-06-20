import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CW20TokenAdoService } from './cw20-token.service'
import { CW20TokenQuery, TokenInfo, TxInfo } from './types'

@Resolver(CW20TokenQuery)
export class CW20TokenAdoResolver {
  constructor(private readonly cw20tokenAdoService: CW20TokenAdoService) {}

  @Query(() => CW20TokenQuery)
  public async cw20token(@Args('contractAddress') contractAddress: string): Promise<CW20TokenQuery> {
    return { contractAddress: contractAddress } as CW20TokenQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() token: CW20TokenQuery): Promise<string> {
    return this.cw20tokenAdoService.owner(token.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() token: CW20TokenQuery): Promise<string[]> {
    return this.cw20tokenAdoService.operators(token.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() token: CW20TokenQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.cw20tokenAdoService.isOperator(token.contractAddress, operatorAddress)
  }

  @ResolveField(() => TokenInfo)
  public async tokenInfo(@Parent() token: CW20TokenQuery): Promise<TokenInfo> {
    return this.cw20tokenAdoService.tokenInfo(token.contractAddress)
  }

  @ResolveField(() => [TxInfo])
  public async tx(@Parent() token: CW20TokenQuery, @Args('blockHeight') blockHeight: number): Promise<[TxInfo]> {
    return this.cw20tokenAdoService.tx(token.contractAddress, blockHeight)
  }
}
