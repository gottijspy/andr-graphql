import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AllNftInfo, NftApproval, NftContractInfo, TransferAgreement } from 'src/ado/types'
import { NftInfo, NftOwnerInfo, NftContract } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { INVALID_QUERY_ERR, NFT_QUERY_INCLUDE_EXPIRED, NFT_QUERY_TOKEN_ID } from '../types/ado.constants'
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
      console.log(ownerInfo)
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
    const query = {
      all_operators: {
        owner: owner,
        include_expired: includeExpired,
      },
    }

    try {
      const allOperators = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      approval: {
        token_id: tokenId,
        spender: spender,
        include_expired: includeExpired,
      },
    }

    try {
      const approvedForAll = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      approval: {
        token_id: tokenId,
        include_expired: includeExpired,
      },
    }

    try {
      const approvals = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      num_tokens: {},
    }

    try {
      const numTokens = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      nft_info: {
        token_id: tokenId,
      },
    }

    try {
      const nftInfo = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      all_nft_info: {
        token_id: tokenId,
        include_expired: includeExpired,
      },
    }

    try {
      const allNftInfo = await this.wasmService.queryContract(contractAddress, query)
      console.log(allNftInfo)
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
    const query = {
      is_archived: {
        token_id: tokenId,
      },
    }

    try {
      const isArchived = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      transfer_agreeement: {
        token_id: tokenId,
      },
    }

    try {
      const transferAgreement = await this.wasmService.queryContract(contractAddress, query)
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
    const query = {
      tokens: {
        owner: owner,
      },
    }

    try {
      const tokenResponse = await this.wasmService.queryContract(contractAddress, query)
      return tokenResponse.tokens ?? []
    } catch (err: any) {
      console.log(err)
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async allTokens(contractAddress: string, options?: AndrSearchOptions): Promise<string[]> {
    const query = {
      all_tokens: {},
    }

    try {
      const tokenResponse = await this.wasmService.queryContract(contractAddress, query)
      return tokenResponse.tokens ?? []
    } catch (err: any) {
      console.log(err)
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async contractInfo(contractAddress: string): Promise<NftContractInfo> {
    const query = {
      contract_info: {},
    }

    try {
      const contractInfo = await this.wasmService.queryContract(contractAddress, query)
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
