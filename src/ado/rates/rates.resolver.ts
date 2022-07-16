import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AdoContractError, RateInfo, RatesContract, RatesContractResult, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { RatesService } from './rates.service'

@Resolver(RatesContract)
export class RatesResolver {
  constructor(private readonly ratesService: RatesService) {}

  @Query(() => RatesContractResult)
  public async rates(@Args('address') address: string): Promise<typeof RatesContractResult> {
    const contractInfo = await this.ratesService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Rates) {
      return contractInfo as RatesContract
    }

    const typeError = new TypeMismatchError(AdoType.Rates, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() rates: RatesContract): Promise<string> {
    return this.ratesService.owner(rates.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() rates: RatesContract): Promise<string[]> {
    return this.ratesService.operators(rates.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() rates: RatesContract, @Args('operator') operator: string): Promise<boolean> {
    return this.ratesService.isOperator(rates.address, operator)
  }

  @ResolveField(() => [RateInfo])
  public async payments(@Parent() rates: RatesContract): Promise<RateInfo[]> {
    return this.ratesService.payments(rates.address)
  }
}
