import { Injectable } from '@nestjs/common'
import { AndrSearchOptions } from 'src/ado-common/models'
import { AuctionAdo, AuctionInfo, Bid } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class AuctionAdoService {
  public async auction(): Promise<AuctionAdo> {
    return {} as AuctionAdo
  }

  public async latestAuctionState(tokenId: string, tokenAddress: string): Promise<AuctionAdo> {
    return {} as AuctionAdo
  }

  public async auctionState(auctionId: number): Promise<AuctionAdo> {
    return {} as AuctionAdo
  }

  public async bids(auctionId: number, options?: AndrSearchOptions): Promise<Bid[]> {
    return [
      {
        bidder: 'terra1...',
        amount: 500,
        timestamp: '60',
      },
    ] as Bid[]
  }

  public async auctionIds(tokenId: string, tokenAddress: string): Promise<number[]> {
    return [0, 3]
  }

  public async auctioninfo(tokenAddress: string, options?: AndrSearchOptions): Promise<AuctionInfo> {
    return {
      auctionIds: [0, 1],
      tokenAddress: 'terra1...',
      tokenId: 'token_001',
    } as AuctionInfo
  }

  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
