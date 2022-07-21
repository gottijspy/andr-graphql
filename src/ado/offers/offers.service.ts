import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { OfferResponse } from '../types'
import { INVALID_QUERY_ERR, OFFERS_QUERY_PURCHASER, OFFERS_QUERY_TOKEN_ID } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'
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
    const queryMsgStr = JSON.stringify(queryMsgs.offers.offer).replace(OFFERS_QUERY_TOKEN_ID, tokenId)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const offerResponse = await this.wasmService.queryContract(contractAddress, queryMsg)
      return offerResponse as OfferResponse
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)

      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async allOffers(
    contractAddress: string,
    purchaser: string,
    options?: AndrSearchOptions,
  ): Promise<OfferResponse[]> {
    const queryMsgStr = JSON.stringify(queryMsgs.offers.all_offers).replace(OFFERS_QUERY_PURCHASER, purchaser)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const offers = await this.wasmService.queryContract(contractAddress, queryMsg)
      return offers.allOffers ?? []
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
