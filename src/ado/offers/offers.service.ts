import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrSearchOptions } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { OfferResponse } from './types'

@Injectable()
export class OffersAdoService {
  constructor(
    @InjectPinoLogger(OffersAdoService.name)
    private readonly logger: PinoLogger,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {}

  public async offer(contractAddress: string, tokenId: string): Promise<OfferResponse> {
    const query = {
      offer: {
        token_id: tokenId,
      },
    }

    try {
      const offerResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return offerResponse as OfferResponse
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
      const offers = await this.cosmService.queryContractSmart(contractAddress, query)
      return offers.allOffers ?? []
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
