import { Injectable } from '@nestjs/common'
import { AnchorAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class AnchorAdoService {
  public async instance(): Promise<AnchorAdo> {
    return {} as AnchorAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
