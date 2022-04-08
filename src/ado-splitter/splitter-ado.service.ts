import { Injectable } from '@nestjs/common'
import { SplitterAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class SplitterAdoService {
  public async instance(): Promise<SplitterAdo> {
    return {} as SplitterAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
