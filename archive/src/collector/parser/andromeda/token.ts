import { ParseArgs } from './parseArgs'
import { txService, factoryService } from 'services'

export async function parse(args: ParseArgs): Promise<void> {
    const { manager, height, txHash, timestamp, contractEvent, fee } = args

    const actionType = contractEvent.action?.actionType
    if (!actionType)
      return
      const datetime = new Date(timestamp)
      if (actionType === 'mint'){
      const { tokenId : token_id } = contractEvent.action
      const operate = "mint"
      const tx = { height, txHash, datetime, token_id, operate, token: contractEvent.address, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    if (actionType === 'transfer'){
      const { tokenId : token_id, recipient, sender } = contractEvent.action
      const operate = "transfer"
      const tx = { height, txHash, datetime, token_id, recipient, sender, operate, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    if (actionType === 'send'){
      const { tokenId : token_id, spender, recipient } = contractEvent.action
      const operate = "send"
      const tx = { height, txHash, datetime, spender, recipient, token_id, operate, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    if (actionType === 'approve'){
      const { tokenId : token_id, spender } = contractEvent.action
      const operate = "approve"
      const tx = { height, txHash, datetime, token_id, spender, operate, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    if (actionType === 'revoke'){
      const { tokenId : token_id, spender } = contractEvent.action
      const operate = "revoke"
      const tx = { height, txHash, datetime, token_id, spender, operate, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    // if (actionType === 'approve_all'){
    //   const { operator, sender } = contractEvent.action
    //   const operate = "approve_all"
    //   const tx = { height, txHash, datetime, operator, sender, operate, factoryId: factoryService().get().id }
    //   await txService().newTx({ ...tx }, manager)
    //   return
    // }
    // if (actionType === 'revoke_all'){
    //   const { operator, sender } = contractEvent.action
    //   const operate = "revoke_all"
    //   const tx = { height, txHash, datetime, operator, sender, operate, factoryId: factoryService().get().id }
    //   await txService().newTx({ ...tx }, manager)
    //   return
    // }
    if (actionType === 'transfer_agreement'){
      const { tokenId : token_id, purchaser, amount } = contractEvent.action
      const operate = "transfer_agreement"
      const tx = { height, txHash, datetime, token_id, operate, purchaser, amount, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    if (actionType === 'archive'){
      const { tokenId : token_id, sender } = contractEvent.action
      const operate = "archive"
      const tx = { height, txHash, datetime, token_id, operate, sender, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }
    if (actionType === 'burn'){
      const { tokenId : token_id, sender } = contractEvent.action
      const operate = "burn"
      const tx = { height, txHash, datetime, sender, token_id, operate, factoryId: factoryService().get().id }
      await txService().newTx({ ...tx }, manager)
      return
    }

}