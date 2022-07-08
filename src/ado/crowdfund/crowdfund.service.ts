import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { CrowdfundConfig, CrowdfundState } from './types'

@Injectable()
export class CrowdfundAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(CrowdfundAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  //FIX: State not found
  public async state(contractAddress: string): Promise<CrowdfundState> {
    const query = {
      state: {},
    }

    try {
      const crowdfundState = await this.cosmService.queryContractSmart(contractAddress, query)
      return crowdfundState
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async config(contractAddress: string): Promise<CrowdfundConfig> {
    const query = {
      config: {},
    }

    try {
      const crowdfundConfig = await this.cosmService.queryContractSmart(contractAddress, query)
      console.log(crowdfundConfig)
      return crowdfundConfig
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async availableTokens(contractAddress: string): Promise<string[]> {
    const query = {
      available_tokens: {},
    }

    try {
      const queryResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return queryResponse
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async isTokenAvailable(contractAddress: string, tokenId: string): Promise<boolean> {
    const query = {
      is_token_available: {
        id: tokenId,
      },
    }

    try {
      const queryResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return queryResponse ?? false
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
