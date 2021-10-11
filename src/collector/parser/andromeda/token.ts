import { ParseArgs } from './parseArgs'
import { txService, factoryService } from 'services'

export async function parse(args: ParseArgs): Promise<void> {
    const { manager, height, txHash, timestamp, contractEvent, fee } = args

    const actionType = contractEvent.action?.actionType
    if (!actionType)
      return

    if (actionType === 'send_nft') {
        const { sender, recipient, token_id } = contractEvent.action
        const datetime = new Date(timestamp)
        const tx = { height, txHash, datetime, token_id, sender, recipient, factoryId: factoryService().get().id }
        await txService().newTx({ ...tx }, manager)
    }
}