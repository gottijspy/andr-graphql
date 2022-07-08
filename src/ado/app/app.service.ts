import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/ado/common/errors'
import { AndrQueryService } from 'src/ado/common/models'
import { InjectCosmClient } from 'src/cosm'
import { AppComponent, AppComponentAddress, AppConfig } from './types'

@Injectable()
export class AdoAppService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(AdoAppService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
    @InjectCosmClient()
    protected readonly cosmService: CosmWasmClient,
  ) {
    super(logger, lcdService, cosmService)
  }

  public async getAddresses(contractAddress: string): Promise<AppComponentAddress[]> {
    const query = {
      get_addresses: {},
    }

    try {
      //const addresses = await this.cosmService.queryContractSmart<string[]>(contractAddress, query)
      const addresses = await this.cosmService.queryContractSmart(contractAddress, query)
      return addresses as AppComponentAddress[]
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async getAddress(contractAddress: string, name: string): Promise<string> {
    const query = {
      get_address: {
        name: name,
      },
    }

    try {
      const address = await this.cosmService.queryContractSmart(contractAddress, query)
      //const address = await this.cosmService.queryContractSmart<string>(contractAddress, query)
      return address
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async getComponents(contractAddress: string): Promise<AppComponent[]> {
    const query = {
      get_components: {},
    }

    try {
      const components = await this.cosmService.queryContractSmart(contractAddress, query)
      //const components = await this.cosmService.queryContractSmart<AppComponent[]>(contractAddress, query)
      console.log(components)
      return components as AppComponent[]
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async config(contractAddress: string): Promise<AppConfig> {
    const query = {
      config: {},
    }

    try {
      const config = await this.cosmService.queryContractSmart(contractAddress, query)
      //const config = await this.cosmService.queryContractSmart<AppConfig>(contractAddress, query)
      return config as AppConfig
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
