import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService, AndrSearchOptions } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { AllNftInfo, NftApproval, NftApprovedForAll, NftContractInfo } from './types'
import { NftInfo, NftNumTokens, NftOwnerInfo, NftQuery } from './types'

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
      const minterInfo = await this.lcdService.wasm.contractQuery<NftQuery>(contractAddress, query)
      return minterInfo.minter
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
      const ownerInfo = await this.lcdService.wasm.contractQuery<NftOwnerInfo>(contractAddress, query)
      return ownerInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async approvedForAll(
    contractAddress: string,
    owner: string,
    includeExpired: boolean,
    options?: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    const query = {
      approved_for_all: {
        owner: owner,
        include_expired: includeExpired,
      },
    }

    try {
      const approvedForAll = await this.lcdService.wasm.contractQuery<NftApprovedForAll>(contractAddress, query)
      return approvedForAll.operators ?? []
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
      const numTokens = await this.lcdService.wasm.contractQuery<NftNumTokens>(contractAddress, query)
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
      const nftInfo = await this.lcdService.wasm.contractQuery<NftInfo>(contractAddress, query)
      return nftInfo
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
      const allNftInfo = await this.lcdService.wasm.contractQuery<AllNftInfo>(contractAddress, query)
      return allNftInfo
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
      const tokenResponse = await this.lcdService.wasm.contractQuery<Partial<NftQuery>>(contractAddress, query)
      console.log(tokenResponse)
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
      const tokenResponse = await this.lcdService.wasm.contractQuery<Partial<NftQuery>>(contractAddress, query)
      console.log(tokenResponse)
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
      const contractInfo = await this.lcdService.wasm.contractQuery<NftContractInfo>(contractAddress, query)
      return contractInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
