import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { DEFAULT_CATCH_ERR, INVALID_QUERY_ERR } from '../types'
import { AuctionSchema, AUCTION_QUERY_AUCTION_ID, AUCTION_QUERY_TOKEN_ADDRESS, AUCTION_QUERY_TOKEN_ID } from './types'
import { AuctionIDsResponse, AuctionInfosForAddressResponse, AuctionStateResponse, BidsResponse } from './types'

@Injectable()
export class AuctionService extends AdoService {
  constructor(
    @InjectPinoLogger(AuctionService.name)
    protected readonly logger: PinoLogger,

    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  // /**
  //  * @deprecated Moved to `ADO` query resolver, use `auction` field on `ADO` to resolve this query.
  //  */
  // public async getAdo(address: string): Promise<AuctionAdo> {
  //   const response = await this.wasmService.queryContract(address, AndrQuerySchema.type)
  //   if (response.ado_type && response.ado_type === AdoType.Auction) {
  //     const wasmContract = await this.wasmService.getContract(address)
  //     return {
  //       address: address,
  //       type: response.ado_type,
  //       andr: wasmContract as AndrQuery
  //     } as AuctionAdo
  //   }

  //   const typeError = new TypeMismatchError(AdoType.Auction, response.ado_type)
  //   throw new UserInputError(typeError.error, { ...typeError })
  // }

  // /**
  //  * @deprecated Moved to `andr` query resolver, use `owner` field on `andr` to resolve this query.
  //  */
  //  public async owner(address: string): Promise<string> {
  //   try {
  //     const queryResponse = await this.wasmService.queryContract(address, AndrQuerySchema.owner)
  //     return queryResponse.owner
  //   } catch (err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     if (err instanceof UserInputError || err instanceof ApolloError) {
  //       throw err
  //     }

  //     throw new ApolloError(INVALID_QUERY_ERR)
  //   }
  // }

  // /**
  //  * @deprecated Moved to `andr` query resolver, use `operators` field on `andr` to resolve this query.
  //  */
  // public async operators(address: string): Promise<string[]> {
  //   try {
  //     const queryResponse = await this.wasmService.queryContract(address, AndrQuerySchema.operators)
  //     return queryResponse.operators
  //   } catch (err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     if (err instanceof UserInputError || err instanceof ApolloError) {
  //       throw err
  //     }

  //     throw new ApolloError(INVALID_QUERY_ERR)
  //   }
  // }

  // /**
  //  * @deprecated Moved to `andr` query resolver, use `isOperator` field on `andr` to resolve this query.
  //  */
  // public async isOperator(address: string, operator: string): Promise<boolean> {
  //   const queryMsgStr = JSON.stringify(AndrQuerySchema.is_operator).replace(ANDR_QUERY_OPERATOR, operator)
  //   const queryMsg = JSON.parse(queryMsgStr)

  //   try {
  //     const queryResponse = await this.wasmService.queryContract(address, queryMsg)
  //     return queryResponse.isOperator ?? false
  //   } catch (err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     if (err instanceof UserInputError || err instanceof ApolloError) {
  //       throw err
  //     }

  //     throw new ApolloError(INVALID_QUERY_ERR)
  //   }
  // }

  public async getLatestAuctionState(
    address: string,
    tokenId: string,
    tokenAddress: string,
  ): Promise<AuctionStateResponse> {
    try {
      const queryMsgStr = JSON.stringify(AuctionSchema.latest_auction_state)
        .replace(AUCTION_QUERY_TOKEN_ID, tokenId)
        .replace(AUCTION_QUERY_TOKEN_ADDRESS, tokenAddress)

      const queryMsg = JSON.parse(queryMsgStr)
      const auctionState = await this.wasmService.queryContract(address, queryMsg)
      return auctionState as AuctionStateResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getAuctionState(address: string, auctionId: number): Promise<AuctionStateResponse> {
    try {
      const queryMsgStr = JSON.stringify(AuctionSchema.auction_state).replace(
        AUCTION_QUERY_AUCTION_ID,
        String(auctionId),
      )

      const queryMsg = JSON.parse(queryMsgStr)
      const auctionState = await this.wasmService.queryContract(address, queryMsg)
      return auctionState as AuctionStateResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getBids(address: string, auctionId: number): Promise<BidsResponse> {
    try {
      const queryMsgStr = JSON.stringify(AuctionSchema.bids).replace(AUCTION_QUERY_AUCTION_ID, String(auctionId))

      const queryMsg = JSON.parse(queryMsgStr)
      const bids = await this.wasmService.queryContract(address, queryMsg)
      return bids as BidsResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getAuctionIDs(address: string, tokenId: string, tokenAddress: string): Promise<AuctionIDsResponse> {
    try {
      const queryMsgStr = JSON.stringify(AuctionSchema.auction_ids)
        .replace(AUCTION_QUERY_TOKEN_ID, tokenId)
        .replace(AUCTION_QUERY_TOKEN_ADDRESS, tokenAddress)

      const queryMsg = JSON.parse(queryMsgStr)
      const auctionState = await this.wasmService.queryContract(address, queryMsg)
      return auctionState as AuctionIDsResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getAuctionInfosForAddress(
    address: string,
    tokenAddress: string,
  ): Promise<AuctionInfosForAddressResponse> {
    try {
      const queryMsgStr = JSON.stringify(AuctionSchema.auction_infos_for_address).replace(
        AUCTION_QUERY_TOKEN_ADDRESS,
        tokenAddress,
      )

      const queryMsg = JSON.parse(queryMsgStr)
      const auctionInfo = await this.wasmService.queryContract(address, queryMsg)
      return auctionInfo as AuctionInfosForAddressResponse
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
