import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrSearchOptions } from 'src/ado-common/models'
import { AuctionAdoService } from './auction-ado.service'
import { Auction, AuctionAdo } from './models'
import { Bid } from './models/auction-bid.model'
import { AuctionInfo } from './models/auction-info.model'

@Resolver(Auction)
export class AuctionAdoResolver {
  constructor(private readonly auctionAdoService: AuctionAdoService) {}

  @Query(() => Auction)
  public async auction(): Promise<Auction> {
    return {} as Auction
  }

  // Queries the most recent auction for the given token
  // (either ongoing, complete, or not started yet).
  @ResolveField(() => AuctionAdo)
  public async latestAuctionState(
    @Args('tokenId') tokenId: string,
    @Args('tokenAddress') tokenAddress: string,
  ): Promise<AuctionAdo> {
    return await this.auctionAdoService.latestAuctionState(tokenId, tokenAddress)
  }

  // Gets the auction state for a particular auction_id
  @ResolveField(() => AuctionAdo)
  public async auctionState(@Args('auctionId') auctionId: number): Promise<AuctionAdo> {
    return await this.auctionAdoService.auctionState(auctionId)
  }

  @ResolveField(() => [Bid])
  public async bids(
    @Args('auctionId') auctionId: number,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<Bid[]> {
    return await this.auctionAdoService.bids(auctionId, options)
  }

  @ResolveField(() => AuctionInfo)
  public async auctionInfo(
    @Args('tokenAddress') tokenAddress: string,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<AuctionInfo> {
    return await this.auctionAdoService.auctioninfo(tokenAddress, options)
  }

  @ResolveField(() => [Number])
  public async auctionIds(
    @Args('tokenId') tokenId: string,
    @Args('tokenAddress') tokenAddress: string,
  ): Promise<number[]> {
    return await this.auctionAdoService.auctionIds(tokenId, tokenAddress)
  }

  //Missing @Args: Open-endded query?
  @ResolveField(() => String)
  public async owner(): Promise<string> {
    return ''
  }
}
