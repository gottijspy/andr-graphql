import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { OfferResponse } from '../types'
import { AndrSearchOptions } from '../types/andr-search-options.input'

@Injectable()
export class OffersService extends AdoService {
  constructor(
    @InjectPinoLogger(OffersService.name)
    readonly logger: PinoLogger,
    @Inject(WasmService)
    readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async offer(contractAddress: string, tokenId: string): Promise<OfferResponse> {
    const query = {
      offer: {
        token_id: tokenId,
      },
    }

    try {
      const offerResponse = await this.wasmService.queryContract(contractAddress, query)
      return offerResponse as OfferResponse
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)

      throw new Error(err)
    }
  }

  public async allOffers(
    contractAddress: string,
    purchaser: string,
    options?: AndrSearchOptions,
  ): Promise<OfferResponse[]> {
    const query = {
      all_offers: {
        purchaser: purchaser,
      },
    }

    try {
      const offers = await this.wasmService.queryContract(contractAddress, query)
      return offers.allOffers ?? []
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new Error(err)
    }
  }
}
