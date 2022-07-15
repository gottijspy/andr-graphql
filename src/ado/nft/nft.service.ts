import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrSearchOptions } from 'src/ado/common/interfaces'
import { AllNftInfo, NftApproval, NftContractInfo, TransferAgreement } from 'src/ado/types'
import { NftInfo, NftOwnerInfo, NftContract } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'

@Injectable()
export class NftCollectibleAdoService extends AdoService {
  constructor(
    @InjectPinoLogger(NftCollectibleAdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  // public async getNftContract(address: string): Promise<typeof NftContractResult>{
  //   try {
  //     const contractInfo = await this.getContract(address)
  //     console.log(contractInfo)
  //     if ('queries_expected' in contractInfo) {
  //       if (contractInfo.queries_expected && contractInfo.queries_expected.includes(NFT_QUERY)) {
  //         return contractInfo as NftContract
  //       }
  //     }

  //     console.log('Message')
  //     if ('message' in contractInfo) {
  //       if (contractInfo.message){
  //         return { code: contractInfo.code ?? -1, message: contractInfo.message }
  //       }
  //     }

  //     return { code: 1, message: INVALID_ADO_NFT }
  //   } catch(err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     const errMsg = err.toString()
  //     if (errMsg) {
  //       return { code: -1, message: errMsg } as AdoContractError
  //     }

  //     throw new Error(err)
  //   }
  // }

  public async minter(contractAddress: string): Promise<string> {
    const query = {
      minter: {},
    }

    try {
      const minterInfo = await this.wasmService.queryContract(contractAddress, query)
      return (minterInfo as NftContract).minter
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
      const ownerInfo = await this.wasmService.queryContract(contractAddress, query)
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
      const allOperators = await this.wasmService.queryContract(contractAddress, query)
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
      const approvedForAll = await this.wasmService.queryContract(contractAddress, query)
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
      const approvals = await this.wasmService.queryContract(contractAddress, query)
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
      const numTokens = await this.wasmService.queryContract(contractAddress, query)
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
      const nftInfo = await this.wasmService.queryContract(contractAddress, query)
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
      const allNftInfo = await this.wasmService.queryContract(contractAddress, query)
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
      const isArchived = await this.wasmService.queryContract(contractAddress, query)
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
      const transferAgreement = await this.wasmService.queryContract(contractAddress, query)
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
      const tokenResponse = await this.wasmService.queryContract(contractAddress, query)
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
      const tokenResponse = await this.wasmService.queryContract(contractAddress, query)
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
      const contractInfo = await this.wasmService.queryContract(contractAddress, query)
      return contractInfo as NftContractInfo
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
