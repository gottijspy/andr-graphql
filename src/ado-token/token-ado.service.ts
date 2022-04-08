import { Injectable } from '@nestjs/common'
import { TokenAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class TokenAdoService {
  public async instance(): Promise<TokenAdo> {
    return {} as TokenAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
