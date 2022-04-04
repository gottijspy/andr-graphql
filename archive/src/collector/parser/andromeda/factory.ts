import { parseContractEvents, findAttribute } from 'lib/terra'
import { ParseArgs } from './parseArgs'
import { factoryService } from 'services'

export async function parse(
    { manager, log, contract, contractEvent, timestamp: txTimestamp }: ParseArgs
  ): Promise<void> {

    const actionType = contractEvent.action?.actionType
    if (!actionType) {
      return
    }

    if (actionType === 'create') {
      const contractEvents = parseContractEvents(log.events)
      const { name, symbol, minter } = contractEvents[1].action
      const token = contractEvents[1].address;

      const factoryId = contract.factoryId
      const entities = await factoryService().createtoken(factoryId, symbol, name, minter, token)
      await manager.save(entities)
    }
}