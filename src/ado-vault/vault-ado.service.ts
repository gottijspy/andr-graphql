import { Injectable } from '@nestjs/common'
import { VaultAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class VaultAdoService {
  public async instance(): Promise<VaultAdo> {
    return {} as VaultAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
