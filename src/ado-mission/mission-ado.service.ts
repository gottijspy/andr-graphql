import { Injectable } from '@nestjs/common'
import { MissionAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class MissionAdoService {
  public async instance(): Promise<MissionAdo> {
    return {} as MissionAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
