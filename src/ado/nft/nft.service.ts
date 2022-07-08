import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService, AndrSearchOptions } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { AllNftInfo, NftApproval, NftContractInfo, TransferAgreement } from './types'
import { NftInfo, NftOwnerInfo, NftQuery } from './types'

@Injectable()
export class NftCollectibleAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(NftCollectibleAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async minter(contractAddress: string): Promise<string> {
    const query = {
      minter: {},
    }

    try {
      const minterInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      return (minterInfo as NftQuery).minter
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async ownerOf(contractAddress: string, tokenId: string, includeExpired: boolean): Promise<NftOwnerInfo> {
    const query = {
      owner_of: {
        token_id: tokenId,
        include_expired: includeExpired,
      },
    }

    try {
      const ownerInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      return ownerInfo as NftOwnerInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
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
      const allOperators = await this.cosmService.queryContractSmart(contractAddress, query)
      return allOperators.operators ?? []
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
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
      const approvedForAll = await this.cosmService.queryContractSmart(contractAddress, query)
      return approvedForAll as NftApproval
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
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
      const approvals = await this.cosmService.queryContractSmart(contractAddress, query)
      return approvals as NftApproval[]
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async numTokens(contractAddress: string): Promise<number> {
    const query = {
      num_tokens: {},
    }

    try {
      const numTokens = await this.cosmService.queryContractSmart(contractAddress, query)
      return numTokens.count ?? 0
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async nftInfo(contractAddress: string, tokenId: string): Promise<NftInfo> {
    const query = {
      nft_info: {
        token_id: tokenId,
      },
    }

    try {
      const nftInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      return nftInfo as NftInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
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
      const allNftInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      return allNftInfo as AllNftInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async isArchived(contractAddress: string, tokenId: string): Promise<boolean> {
    const query = {
      is_archived: {
        token_id: tokenId,
      },
    }

    try {
      const isArchived = await this.cosmService.queryContractSmart(contractAddress, query)
      return isArchived as boolean
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async transferAgreement(contractAddress: string, tokenId: string): Promise<TransferAgreement> {
    const query = {
      transfer_agreeement: {
        token_id: tokenId,
      },
    }

    try {
      const transferAgreement = await this.cosmService.queryContractSmart(contractAddress, query)
      return transferAgreement as TransferAgreement
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async tokens(contractAddress: string, owner: string, options?: AndrSearchOptions): Promise<string[]> {
    const query = {
      tokens: {
        owner: owner,
      },
    }

    try {
      const tokenResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return tokenResponse.tokens ?? []
    } catch (err) {
      console.log(err)
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async allTokens(contractAddress: string, options?: AndrSearchOptions): Promise<string[]> {
    const query = {
      all_tokens: {},
    }

    try {
      const tokenResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return tokenResponse.tokens ?? []
    } catch (err) {
      console.log(err)
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async contractInfo(contractAddress: string): Promise<NftContractInfo> {
    const query = {
      contract_info: {},
    }

    try {
      const contractInfo = await this.cosmService.queryContractSmart(contractAddress, query)
      return contractInfo as NftContractInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
