import { Injectable } from '@nestjs/common'
import { PrimitiveAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class PrimitiveAdoService {
  public async instance(): Promise<PrimitiveAdo> {
    return {} as PrimitiveAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
