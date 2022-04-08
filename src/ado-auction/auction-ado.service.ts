import { Injectable } from '@nestjs/common'
import { AuctionAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class AuctionAdoService {
  public async instance(): Promise<AuctionAdo> {
    return {} as AuctionAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
