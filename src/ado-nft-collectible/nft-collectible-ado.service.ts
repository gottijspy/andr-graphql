import { Injectable } from '@nestjs/common'
import { NftCollectibleAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class NftCollectibleAdoService {
  public async instance(): Promise<NftCollectibleAdo> {
    return {} as NftCollectibleAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
