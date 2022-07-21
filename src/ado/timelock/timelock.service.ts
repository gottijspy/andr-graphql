import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { Escrow, LockedFunds } from '../types'
import { INVALID_QUERY_ERR, TIMELOCK_QUERY_OWNER, TIMELOCK_QUERY_RECIPIENT } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'

@Injectable()
export class TimelockService extends AdoService {
  constructor(
    @InjectPinoLogger(TimelockService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async getLockedFunds(contractAddress: string, owner: string, recipient: string): Promise<Escrow> {
    const queryMsgStr = JSON.stringify(queryMsgs.timelock.locked_funds)
      .replace(TIMELOCK_QUERY_OWNER, owner)
      .replace(TIMELOCK_QUERY_RECIPIENT, recipient)
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const lockedFunds = await this.wasmService.queryContract(contractAddress, queryMsg)
      console.log(lockedFunds)
      return (lockedFunds as LockedFunds).funds ?? ({} as Escrow)
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
