import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrSearchOptions } from 'src/ado-common/models'
import { LCDClientError } from 'src/common/errors'
import { WasmParams } from 'src/common/models'
import { OfferResponse, OffersQuery } from './types'

@Injectable()
export class OffersAdoService {
  constructor(
    @InjectPinoLogger(OffersAdoService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async offer(contractAddress: string, tokenId: string): Promise<OfferResponse> {
    const query = {
      offer: {
        token_id: tokenId,
      },
    }

    try {
      const offerResponse = await this.lcdService.wasm.contractQuery<OfferResponse>(contractAddress, query)
      return offerResponse
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)

      throw new LCDClientError(err)
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
      const offers = await this.lcdService.wasm.contractQuery<OffersQuery>(contractAddress, query)
      return offers.allOffers ?? []
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async contractQuery(contractAddress: string, query: Record<string, any>, height?: number): Promise<any> {
    try {
      const data = await this.lcdService.wasm.contractQuery(contractAddress, query, { height })
      return data
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<WasmParams> {
    try {
      const parameters = await this.lcdService.wasm.parameters({ height })
      return parameters
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Wasm parameters.')
      throw new LCDClientError(err)
    }
  }
}
