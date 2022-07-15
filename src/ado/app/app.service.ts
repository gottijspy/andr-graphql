import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AppComponent, AppComponentAddress, AppConfig } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { DEFAULT_CATCH_ERR } from '../types/ado.constants'

@Injectable()
export class AdoAppService extends AdoService {
  constructor(
    @InjectPinoLogger(AdoAppService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async config(address: string): Promise<AppConfig> {
    const queryMsg = {
      config: {},
    }

    try {
      const config = await this.wasmService.queryContract(address, queryMsg)
      return config as AppConfig
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async getAddresses(address: string): Promise<AppComponentAddress[]> {
    const queryMsg = {
      get_addresses: {},
    }

    try {
      const addresses = await this.wasmService.queryContract(address, queryMsg)
      return addresses as AppComponentAddress[]
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async getAddress(address: string, name: string): Promise<string> {
    const queryMsg = {
      get_address: {
        name: name,
      },
    }

    try {
      const addressResult = await this.wasmService.queryContract(address, queryMsg)
      return addressResult
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async componentExists(address: string, name: string): Promise<boolean> {
    const queryMsg = {
      component_exists: {
        name: name,
      },
    }

    try {
      const componentResult = await this.wasmService.queryContract(address, queryMsg)
      console.log(componentResult)
      return componentResult
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      throw new Error(err)
    }
  }

  public async getComponents(contractAddress: string): Promise<AppComponent[]> {
    const queryMsg = {
      get_components: {},
    }

    try {
      const components = await this.wasmService.queryContract(contractAddress, queryMsg)
      console.log(components)
      return components as AppComponent[]
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, contractAddress)
      throw new Error(err)
    }
  }
}
