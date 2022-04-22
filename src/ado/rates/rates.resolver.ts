import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { RatesAdoService } from './rates.service'
import { RateInfo, RatesQuery } from './types'

@Resolver(RatesQuery)
export class RatesAdoResolver {
  constructor(private readonly ratesAdoService: RatesAdoService) {}

  @Query(() => RatesQuery)
  public async rates(@Args('contractAddress') contractAddress: string): Promise<RatesQuery> {
    return { contractAddress: contractAddress } as RatesQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() rates: RatesQuery): Promise<string> {
    return this.ratesAdoService.owner(rates.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() rates: RatesQuery): Promise<string[]> {
    return this.ratesAdoService.operators(rates.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(
    @Parent() rates: RatesQuery,
    @Args('operatorAddress') operatorAddress: string,
  ): Promise<boolean> {
    return this.ratesAdoService.isOperator(rates.contractAddress, operatorAddress)
  }

  @ResolveField(() => [RateInfo])
  public async payments(@Parent() rates: RatesQuery): Promise<RateInfo[]> {
    return this.ratesAdoService.payments(rates.contractAddress)
  }
}
