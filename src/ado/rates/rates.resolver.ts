import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoResolver } from '../ado.resolver'
import { RateInfo, RatesContract, TypeMismatchError } from '../types'
import { AdoType } from '../types/ado.enums'
import { RatesService } from './rates.service'

@Resolver(RatesContract)
export class RatesResolver extends AdoResolver {
  constructor(private readonly ratesService: RatesService) {
    super(ratesService)
  }

  @Query(() => RatesContract)
  public async rates(@Args('address') address: string): Promise<RatesContract> {
    const contractInfo = await this.ratesService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.Rates) {
      return contractInfo as RatesContract
    }

    const typeError = new TypeMismatchError(AdoType.Rates, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => [RateInfo])
  public async payments(@Parent() rates: RatesContract): Promise<RateInfo[]> {
    return this.ratesService.payments(rates.address)
  }
}
