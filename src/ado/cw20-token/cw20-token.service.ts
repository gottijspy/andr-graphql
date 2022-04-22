import { Injectable } from '@nestjs/common'
import { CW20TokenAdo } from './types'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class CW20TokenAdoService {
  public async instance(): Promise<CW20TokenAdo> {
    return {} as CW20TokenAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
