import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AndrQueryService } from 'src/ado-common/models'
import { LCDClientError } from 'src/common/errors'
import { MissionComponent, MissionConfig } from './types'

@Injectable()
export class MissionAdoService extends AndrQueryService {
  constructor(
    @InjectPinoLogger(MissionAdoService.name)
    protected readonly logger: PinoLogger,
    @InjectLCDClient()
    protected readonly lcdService: LCDClient,
  ) {
    super(logger, lcdService)
  }

  public async getAddresses(contractAddress: string): Promise<string[]> {
    const query = {
      get_addresses: {},
    }

    try {
      const addresses = await this.lcdService.wasm.contractQuery<string[]>(contractAddress, query)
      return addresses
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
      const address = await this.lcdService.wasm.contractQuery<string>(contractAddress, query)
      return address
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async getComponents(contractAddress: string): Promise<MissionComponent[]> {
    const query = {
      get_components: {},
    }

    try {
      const components = await this.lcdService.wasm.contractQuery<MissionComponent[]>(contractAddress, query)
      console.log(components)
      return components
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }

  public async config(contractAddress: string): Promise<MissionConfig> {
    const query = {
      config: {},
    }

    try {
      const config = await this.lcdService.wasm.contractQuery<MissionConfig>(contractAddress, query)
      return config
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
