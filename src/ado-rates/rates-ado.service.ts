import { Injectable } from '@nestjs/common'
import { RatesAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class RatesAdoService {
  public async instance(): Promise<RatesAdo> {
    return {} as RatesAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
