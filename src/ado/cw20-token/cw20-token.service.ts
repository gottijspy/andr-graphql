import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { TokenInfo } from 'src/ado/types'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { INVALID_QUERY_ERR } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'

@Injectable()
export class CW20TokenService extends AdoService {
  constructor(
    @InjectPinoLogger(CW20TokenService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async tokenInfo(contractAddress: string): Promise<TokenInfo> {
    try {
      const tokenInfo = await this.wasmService.queryContract(contractAddress, queryMsgs.cw20token.token_info)
      console.log(tokenInfo)
      return tokenInfo as TokenInfo
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }

  // public async tx(contractAddress: string, blockHeight: number): Promise<[TxInfo]> {
  //   const query = {
  //     tags: [
  //       { key: 'execute._contract_address', value: contractAddress },
  //       { key: 'message.module', value: 'wasm' },
  //     ],
  //   }

  //   // Optionally can set these for a blockheight range
  //   const filter = { minHeight: blockHeight, maxHeight: blockHeight }

  //   try {
  //     const txs = await this.wasmService.searchTx(query, filter)

  //     console.log(txs)
  //     return txs as [TxInfo]
  //   } catch (err) {
  //     this.logger.error({ err }, 'Error getting transactions for the wasm contract %s query.', contractAddress)
  //     throw new LCDClientError(err)
  //   }
  // }
}
