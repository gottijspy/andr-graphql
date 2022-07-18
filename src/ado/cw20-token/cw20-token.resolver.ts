import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { CW20TokenContract, TokenInfo, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { CW20TokenService } from './cw20-token.service'

@Resolver(CW20TokenContract)
export class CW20TokenResolver extends AdoResolver {
  constructor(private readonly cw20tokenService: CW20TokenService) {
    super(cw20tokenService)
  }

  @Query(() => CW20TokenContract)
  public async cw20token(@Args('address') address: string): Promise<CW20TokenContract> {
    const contractInfo = await this.cw20tokenService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.CW20Token) {
      return contractInfo as CW20TokenContract
    }

    const typeError = new TypeMismatchError(AdoType.CW20Token, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
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
