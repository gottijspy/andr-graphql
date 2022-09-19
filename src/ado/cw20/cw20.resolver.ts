import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { CW20Contract, TokenInfo, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado.resolver'
import { CW20Service } from './cw20.service'

@Resolver(CW20Contract)
export class CW20Resolver extends AdoResolver {
  constructor(private readonly cw20Service: CW20Service) {
    super(cw20Service)
  }

  @Query(() => CW20Contract)
  public async cw20(@Args('address') address: string): Promise<CW20Contract> {
    const contractInfo = await this.cw20Service.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.CW20) {
      return contractInfo as CW20Contract
    }

    const typeError = new TypeMismatchError(AdoType.CW20, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => TokenInfo)
  public async tokenInfo(@Parent() token: CW20Contract): Promise<TokenInfo> {
    return this.cw20Service.tokenInfo(token.address)
  }

  // @ResolveField(() => [TxInfo])
  // public async tx(@Parent() token: CW20TokenContract, @Args('blockHeight') blockHeight: number): Promise<[TxInfo]> {
  //   return this.cw20Service.tx(token.address, blockHeight)
  // }
}
