import { Injectable } from '@nestjs/common'
import { OffersAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class OffersAdoService {
  public async instance(): Promise<OffersAdo> {
    return {} as OffersAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
