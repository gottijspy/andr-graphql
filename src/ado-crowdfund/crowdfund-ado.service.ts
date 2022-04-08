import { Injectable } from '@nestjs/common'
import { CrowdfundAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class CrowdfundAdoService {
  public async instance(): Promise<CrowdfundAdo> {
    return {} as CrowdfundAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
