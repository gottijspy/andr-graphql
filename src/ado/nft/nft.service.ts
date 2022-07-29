import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AllNftInfo, NftApproval, NftContractInfo, TransferAgreement } from 'src/ado/types'
import { NftInfo, NftOwnerInfo, NftContract } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import {
  INVALID_QUERY_ERR,
  NFT_QUERY_INCLUDE_EXPIRED,
  NFT_QUERY_OWNER,
  NFT_QUERY_TOKEN_ID,
} from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'
import { AndrSearchOptions } from '../types/andr-search-options.input'

@Injectable()
export class NftService extends AdoService {
  constructor(
    @InjectPinoLogger(NftService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async minter(contractAddress: string): Promise<string> {
    try {
      const minterInfo = await this.wasmService.queryContract(contractAddress, queryMsgs.nft.minter)
      return (minterInfo as NftContract).minter ?? ''
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async ownerOf(contractAddress: string, tokenId: string, includeExpired: boolean): Promise<NftOwnerInfo> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.owner_of)
      .replace(NFT_QUERY_TOKEN_ID, tokenId)
      .replace(NFT_QUERY_INCLUDE_EXPIRED, String(includeExpired))
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const ownerInfo = await this.wasmService.queryContract(contractAddress, queryMsg)
      return ownerInfo as NftOwnerInfo
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async allOperators(
    contractAddress: string,
    owner: string,
    includeExpired: boolean,
    options?: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.all_operators)
      .replace(NFT_QUERY_OWNER, owner)
      .replace(NFT_QUERY_INCLUDE_EXPIRED, String(includeExpired))
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const allOperators = await this.wasmService.queryContract(contractAddress, queryMsg)
      return allOperators.operators ?? []
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async approval(
    contractAddress: string,
    tokenId: string,
    spender: string,
    includeExpired: boolean,
  ): Promise<NftApproval> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.approval)
      .replace(NFT_QUERY_TOKEN_ID, tokenId)
      .replace(NFT_QUERY_OWNER, spender)
      .replace(NFT_QUERY_INCLUDE_EXPIRED, String(includeExpired))
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const approvedForAll = await this.wasmService.queryContract(contractAddress, queryMsg)
      return approvedForAll as NftApproval
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async approvals(contractAddress: string, tokenId: string, includeExpired: boolean): Promise<NftApproval[]> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.approvals)
      .replace(NFT_QUERY_TOKEN_ID, tokenId)
      .replace(NFT_QUERY_INCLUDE_EXPIRED, String(includeExpired))
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const approvals = await this.wasmService.queryContract(contractAddress, queryMsg)
      return approvals as NftApproval[]
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async numTokens(contractAddress: string): Promise<number> {
    try {
      const numTokens = await this.wasmService.queryContract(contractAddress, queryMsgs.nft.num_tokens)
      return numTokens.count ?? 0
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async nftInfo(contractAddress: string, tokenId: string): Promise<NftInfo> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.nft_info).replace(NFT_QUERY_TOKEN_ID, tokenId)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const nftInfo = await this.wasmService.queryContract(contractAddress, queryMsg)
      return nftInfo as NftInfo
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async allNftInfo(contractAddress: string, tokenId: string, includeExpired: boolean): Promise<AllNftInfo> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.all_nft_info)
      .replace(NFT_QUERY_TOKEN_ID, tokenId)
      .replace(NFT_QUERY_INCLUDE_EXPIRED, String(includeExpired))
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const allNftInfo = await this.wasmService.queryContract(contractAddress, queryMsg)
      return allNftInfo as AllNftInfo
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async isArchived(contractAddress: string, tokenId: string): Promise<boolean> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.is_archived).replace(NFT_QUERY_TOKEN_ID, tokenId)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const isArchived = await this.wasmService.queryContract(contractAddress, queryMsg)
      return isArchived as boolean
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async transferAgreement(contractAddress: string, tokenId: string): Promise<TransferAgreement> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.transfer_agreeement).replace(NFT_QUERY_TOKEN_ID, tokenId)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const transferAgreement = await this.wasmService.queryContract(contractAddress, queryMsg)
      return transferAgreement as TransferAgreement
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async tokens(contractAddress: string, owner: string, options?: AndrSearchOptions): Promise<string[]> {
    const queryMsgStr = JSON.stringify(queryMsgs.nft.tokens).replace(NFT_QUERY_OWNER, owner)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const tokenResponse = await this.wasmService.queryContract(contractAddress, queryMsg)
      return tokenResponse.tokens ?? []
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async allTokens(contractAddress: string, options?: AndrSearchOptions): Promise<string[]> {
    try {
      const tokenResponse = await this.wasmService.queryContract(contractAddress, queryMsgs.nft.all_tokens)
      return tokenResponse.tokens ?? []
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async contractInfo(contractAddress: string): Promise<NftContractInfo> {
    try {
      const contractInfo = await this.wasmService.queryContract(contractAddress, queryMsgs.nft.contract_info)
      return contractInfo as NftContractInfo
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
