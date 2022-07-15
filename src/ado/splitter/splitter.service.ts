import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/ado/common/errors'
import { Splitter, SplitterContract } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'

@Injectable()
export class SplitterAdoService extends AdoService {
  constructor(
    @InjectPinoLogger(SplitterAdoService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  // public async getSplitterContract(address: string): Promise<typeof SplitterContractResult>{
  //   try {
  //     const contractInfo = await this.getContract(address)
  //     console.log(contractInfo)
  //     if ('queries_expected' in contractInfo) {
  //       if (contractInfo.queries_expected && contractInfo.queries_expected.includes(SPLITTER_QUERY)) {
  //         return contractInfo as SplitterContract
  //       }
  //     }

  //     console.log('Message')
  //     if ('message' in contractInfo) {
  //       if (contractInfo.message){
  //         return { code: contractInfo.code ?? -1, message: contractInfo.message }
  //       }
  //     }

  //     return { code: 1, message: INVALID_ADO_SPLITTER }
  //   } catch(err: any) {
  //     this.logger.error({ err }, DEFAULT_CATCH_ERR, address)
  //     const errMsg = err.toString()
  //     if (errMsg) {
  //       return { code: -1, message: errMsg } as AdoContractError
  //     }

  //     throw new Error(err)
  //   }
  // }

  public async config(contractAddress: string): Promise<Splitter> {
    const query = {
      get_splitter_config: {},
    }

    try {
      const splitter = await this.wasmService.queryContract(contractAddress, query)
      console.log(splitter.config)
      return (splitter as SplitterContract).config
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      throw new LCDClientError(err)
    }
  }
}
