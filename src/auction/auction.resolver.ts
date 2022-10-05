import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AuctionService } from './auction.service'
import {
  AuctionContract,
  AuctionIDsResponse,
  AuctionInfosForAddressResponse,
  AuctionStateResponse,
  BidsResponse,
} from './types'

@Resolver(AuctionContract)
export class AuctionResolver {
  constructor(private readonly auctionService: AuctionService) {}

  @Query(() => AuctionContract)
  public async auction(@Args('address') address: string): Promise<AuctionContract> {
    const contractInfo = await this.auctionService.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType === AdoType.Auction) {
      return contractInfo as AuctionContract
    }

    const typeError = new TypeMismatchError(AdoType.Auction, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  @ResolveField(() => AuctionStateResponse)
  public async latestAuctionState(
    @Parent() auction: AuctionContract,
    @Args('tokenId') tokenId: string,
    @Args('tokenAddress') tokenAddress: string,
  ): Promise<AuctionStateResponse> {
    return this.auctionService.getLatestAuctionState(auction.address, tokenId, tokenAddress)
  }

  @ResolveField(() => AuctionStateResponse)
  public async auctionState(
    @Parent() auction: AuctionContract,
    @Args('auctionId') auctionId: number,
  ): Promise<AuctionStateResponse> {
    return this.auctionService.getAuctionState(auction.address, auctionId)
  }

  @ResolveField(() => BidsResponse)
  public async bids(@Parent() auction: AuctionContract, @Args('auctionId') auctionId: number): Promise<BidsResponse> {
    return this.auctionService.getBids(auction.address, auctionId)
  }

  @ResolveField(() => AuctionIDsResponse)
  public async auctionIDs(
    @Parent() auction: AuctionContract,
    @Args('tokenId') tokenId: string,
    @Args('tokenAddress') tokenAddress: string,
  ): Promise<AuctionIDsResponse> {
    return this.auctionService.getAuctionIDs(auction.address, tokenId, tokenAddress)
  }

  @ResolveField(() => AuctionInfosForAddressResponse)
  public async auctionInfosForAddress(
    @Parent() auction: AuctionContract,
    @Args('tokenAddress') tokenAddress: string,
  ): Promise<AuctionInfosForAddressResponse> {
    return this.auctionService.getAuctionInfosForAddress(auction.address, tokenAddress)
  }
}
