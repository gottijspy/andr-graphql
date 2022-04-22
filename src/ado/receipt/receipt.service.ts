import { Injectable } from '@nestjs/common'
import { ReceiptAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class ReceiptAdoService {
  public async instance(): Promise<ReceiptAdo> {
    return {} as ReceiptAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
