import { findAttributes, findAttribute } from 'lib/terra'
import { ParseArgs } from './parseArgs'
import { factoryService } from 'services'

export async function parse(
    { manager, log, contract, contractEvent, timestamp: txTimestamp }: ParseArgs
  ): Promise<void> {

    const actionType = contractEvent.action?.actionType
    if (!actionType) {
      return
    }

    if (actionType === 'create_token') {
        const { name, symbol, minter, token } = contractEvent.action
        const factoryId = contract.factoryId
        const entities = await factoryService().createtoken(factoryId, symbol, name, minter, token)
        await manager.save(entities)
    }
}