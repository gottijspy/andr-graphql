import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService } from 'src/ado/common/models'
import { AddressListResponse } from './types'

@Injectable()
export class AddressListAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(AddressListAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
  ) {
    super(logger, lcdService)
  }

  public async includesAddress(contractAddress: string, address: string): Promise<AddressListResponse> {
    const query = {
      includes_address: {
        address: address,
      },
    }

    try {
      const response = await this.lcdService.wasm.contractQuery<AddressListResponse>(contractAddress, query)
      return response
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
