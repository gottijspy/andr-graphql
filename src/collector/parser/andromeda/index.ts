import * as bluebird from 'bluebird'
import { TxInfo, MsgExecuteContract, TxLog } from '@terra-money/terra.js'
import { EntityManager } from 'typeorm'
import { ContractType } from 'types'
import { ContractEntity } from 'orm'
import { ParseArgs } from './parseArgs'
import { parseContractEvents } from 'lib/terra'
import { contractService } from 'services'
import * as factory from './factory'
import * as token from './token'

export async function parseAndromedaMsg(
    manager: EntityManager, txInfo: TxInfo, msg: MsgExecuteContract, index: number, log: TxLog
  ): Promise<void> {
    const contractRepo = manager.getRepository(ContractEntity)
    const contractEvents = parseContractEvents(log.events)
    if (!contractEvents) {
      return
    }

    const args: ParseArgs = {
      manager,
      height: txInfo.height,
      txHash: txInfo.txhash,
      timestamp: txInfo.timestamp,
      fee: txInfo.tx.fee.amount.toString(),
      sender: msg.sender,
      coins: msg.coins,
      msg: msg.execute_msg,
      log,
      contract: undefined,
      contractEvent: undefined,
      contractEvents,
    }

    await bluebird.mapSeries(contractEvents, async (event) => {
      const contract = await contractService().get({ address: event.address }, undefined, contractRepo)
      if (!contract) {
        return
      }

      args.contract = contract
      args.contractEvent = event
      args.sender = event.sender
      console.log("contract_type:"+contract.type);

      switch (contract.type) {
        case ContractType.FACTORY:
          await factory.parse(args)
          break
        case ContractType.TOKEN:
          await token.parse(args)
          break
      }
    })

    args.contract = undefined
    args.contractEvent = undefined
    args.sender = msg.sender

    // tracking uusd balance
    // await uusdTransfer.parse(manager, txInfo, log)
    // // tracking fee
    // await fee.parse(manager, txInfo, msg.sender)
  }
