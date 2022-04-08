import { Injectable } from '@nestjs/common'
import { TimelockAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class TimelockAdoService {
  public async instance(): Promise<TimelockAdo> {
    return {} as TimelockAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
