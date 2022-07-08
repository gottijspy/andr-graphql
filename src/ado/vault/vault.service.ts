import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { LCDClientError } from '../common/errors'
import { AndrCoin } from '../common/types'
import { AndrStrategy } from './types'

@Injectable()
export class VaultAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(VaultAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async balance(contractAddress: string, address: string): Promise<AndrCoin[]> {
    const query = {
      balance: {
        address: address,
      },
    }

    try {
      const queryResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return queryResponse as AndrCoin[]
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async strategyAddress(contractAddress: string, strategy: string): Promise<AndrStrategy> {
    const query = {
      strategy_address: {
        strategy: strategy,
      },
    }

    try {
      const queryResponse = await this.cosmService.queryContractSmart(contractAddress, query)
      return queryResponse as AndrStrategy
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
