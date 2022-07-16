import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, CW20TokenContract, TokenInfo, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { Cw20TokenContractResult } from '../types/cw20token.contract'
import { CW20TokenService } from './cw20-token.service'

@Resolver(CW20TokenContract)
export class CW20TokenResolver {
  constructor(private readonly cw20tokenService: CW20TokenService) {}

  @Query(() => Cw20TokenContractResult)
  public async cw20token(@Args('address') address: string): Promise<typeof Cw20TokenContractResult> {
    const contractInfo = await this.cw20tokenService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.CW20Token) {
      return contractInfo as CW20TokenContract
    }

    const typeError = new TypeMismatchError(AdoType.CW20Token, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() token: CW20TokenContract): Promise<string> {
    return this.cw20tokenService.owner(token.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() token: CW20TokenContract): Promise<string[]> {
    return this.cw20tokenService.operators(token.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() token: CW20TokenContract, @Args('operator') operator: string): Promise<boolean> {
    return this.cw20tokenService.isOperator(token.address, operator)
  }

  @ResolveField(() => TokenInfo)
  public async tokenInfo(@Parent() token: CW20TokenContract): Promise<TokenInfo> {
    return this.cw20tokenService.tokenInfo(token.address)
  }

  // @ResolveField(() => [TxInfo])
  // public async tx(@Parent() token: CW20TokenContract, @Args('blockHeight') blockHeight: number): Promise<[TxInfo]> {
  //   return this.cw20tokenService.tx(token.address, blockHeight)
  // }
}
