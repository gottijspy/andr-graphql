import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AppComponent, AppComponentAddress, AppConfig } from 'src/app/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado/ado.service'
import { APP_QUERY_COMPONENT_NAME, DEFAULT_CATCH_ERR, INVALID_QUERY_ERR } from '../ado/types/ado.constants'
import { queryMsgs } from '../ado/types/ado.querymsg'

@Injectable()
export class AppService extends AdoService {
  constructor(
    @InjectPinoLogger(AppService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async config(address: string): Promise<AppConfig> {
    try {
      const config = await this.wasmService.queryContract(address, queryMsgs.adoapp.config)
      return config as AppConfig
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getAddresses(address: string): Promise<AppComponentAddress[]> {
    try {
      const addresses = await this.wasmService.queryContract(address, queryMsgs.adoapp.get_addresses)
      return addresses as AppComponentAddress[]
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getAddress(address: string, name: string): Promise<string> {
    const queryMsgStr = JSON.stringify(queryMsgs.adoapp.get_address).replace(APP_QUERY_COMPONENT_NAME, name)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const addressResult = await this.wasmService.queryContract(address, queryMsg)
      return addressResult
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async componentExists(address: string, name: string): Promise<boolean> {
    const queryMsgStr = JSON.stringify(queryMsgs.adoapp.component_exists).replace(APP_QUERY_COMPONENT_NAME, name)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const componentResult = await this.wasmService.queryContract(address, queryMsg)
      return componentResult
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  public async getComponents(contractAddress: string): Promise<AppComponent[]> {
    try {
      const components: AppComponent[] = await this.wasmService.queryContract(
        contractAddress,
        queryMsgs.adoapp.get_components,
      )
      return components
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
