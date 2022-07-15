import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AndrStrategy } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { LCDClientError } from '../common/errors'
import { AndrCoin } from '../common/types'

@Injectable()
export class VaultAdoService extends AdoService {
  constructor(
    @InjectPinoLogger(VaultAdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  // public async getVaultContract(address: string): Promise<typeof VaultContractResult>{
  //   try {
  //     const contractInfo = await this.getContract(address)
  //     console.log(contractInfo)
  //     if ('queries_expected' in contractInfo) {
  //       if (contractInfo.queries_expected && contractInfo.queries_expected.includes(VAULT_QUERY)) {
  //         return contractInfo as VaultContract
  //       }
  //     }

  //     console.log('Message')
  //     if ('message' in contractInfo) {
  //       if (contractInfo.message){
  //         return { code: contractInfo.code ?? -1, message: contractInfo.message }
  //       }
  //     }

  //     return { code: 1, message: INVALID_ADO_VAULT }
  //   } catch(err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     const errMsg = err.toString()
  //     if (errMsg) {
  //       return { code: -1, message: errMsg } as AdoContractError
  //     }

  //     throw new Error(err)
  //   }
  // }

  public async balance(contractAddress: string, address: string): Promise<AndrCoin[]> {
    const query = {
      balance: {
        address: address,
      },
    }

    try {
      const queryResponse = await this.wasmService.queryContract(contractAddress, query)
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
      const queryResponse = await this.wasmService.queryContract(contractAddress, query)
      return queryResponse as AndrStrategy
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
