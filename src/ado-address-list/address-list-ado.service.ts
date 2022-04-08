import { Injectable } from '@nestjs/common'
import { AddressListAdo } from './models'
//import { AdoSearchOptions, AdoSearchResult } from './models'

@Injectable()
export class AddressListAdoService {
  public async instance(): Promise<AddressListAdo> {
    return {} as AddressListAdo
  }
  // public async search(options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   throw new Error('Method not implemented.')
  // }
}
