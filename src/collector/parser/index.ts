import { EntityManager } from 'typeorm'
import {
    TxInfo, Msg, TxLog, MsgSend, MsgMultiSend, MsgSwap, MsgSwapSend, MsgExecuteContract
  } from '@terra-money/terra.js'
import * as bluebird from 'bluebird'
import { parseAndromedaMsg } from './andromeda'

async function parseMsg(
    manager: EntityManager, txInfo: TxInfo, msg: Msg, index: number, log: TxLog
  ): Promise<void> {
    if (msg instanceof MsgExecuteContract) {
      return parseAndromedaMsg(manager, txInfo, msg, index, log)
    }
}


export async function parseTxs(manager: EntityManager, txs: TxInfo[]): Promise<void> {
    await bluebird.mapSeries(txs, async (txInfo) => {
      await bluebird.mapSeries(txInfo.tx.msg, async (msg, index) => {
        await parseMsg(manager, txInfo, msg, index, txInfo.logs[index]).catch((error) => {
          if (error) {
            error['height'] = txInfo.height
            error['txHash'] = txInfo.txhash
            error['msg'] = JSON.stringify(msg)
            error['log'] = JSON.stringify(txInfo.logs[index])
          }
          throw error
        })
      })

      // save parsed tx hash
      // await manager.getRepository(TxHashEntity).save(new TxHashEntity({
      //   height: txInfo.height, txHash: txInfo.txhash, datetime: new Date(txInfo.timestamp)
      // }))
    })
}

