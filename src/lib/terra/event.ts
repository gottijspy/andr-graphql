import { Event, EventKV } from '@terra-money/terra.js'
import { camelCase } from 'lodash'


export interface ContractAction {
    actionType: string
    [key: string]: string
}

export interface ContractEvent {
    address: string
    sender: string
    action?: ContractAction // andromeda contracts spec
    [key: string]: ContractAction | string
}

export interface ExecuteContract {
    sender: string
    contract: string
}

export function findAttributes(events: Event[], type: string, attribute?: EventKV): EventKV[] {
    if (attribute) {
      for (const event of events) {
        if (event.type === type) {
          for (const attr of event.attributes) {
            if (attr.key === attribute.key && attr.value === attribute.value) {
              return event.attributes
            }
          }
        }
      }
      return undefined
    }

    return events.find((event) => event.type === type)?.attributes
}
export function findAttribute(attributes: EventKV[], key: string): string {
  return attributes.find((attr) => attr.key === key)?.value
}

export function parseExecuteContracts(events: Event[]): ExecuteContract[] {
    const attributes = findAttributes(events, 'execute_contract')
    if (!attributes) {
      return
    }

    const executeContracts = []

    for (let i = 0; i < attributes.length / 2; i += 1) {
      const sender = attributes[i * 2].value
      const contractAddress = attributes[i * 2 + 1].value

      executeContracts.push({ sender, contractAddress })
    }

    // note: execute_contract log is in reverse order.
    return executeContracts.reverse()
}


export function parseContractEvents(events: Event[]): ContractEvent[] {
    const executeContracts = parseExecuteContracts(events)
    const attributes = findAttributes(events, 'from_contract')
    if (!Array.isArray(executeContracts) || !Array.isArray(attributes)) {
      return
    }

    const contractEvents = []
    let event: ContractEvent = {
      address: undefined,
      sender: undefined,
      action: undefined,
    }

    for (let i = 0; i < attributes.length; i += 1) {
      const attr = attributes[i]
      if (attr.key === 'contract_address') {
        event = {
          address: attr.value,
          sender: executeContracts[contractEvents.length]?.sender,
          action: undefined,
        }

        contractEvents.push(event)
        continue
      }

      if (attr.key === 'action') {
        event.action = { actionType: attr.value }

        for (i = i + 1; i < attributes.length; i += 1) {
          const attr = attributes[i]

          if (attr.key === 'contract_address') {
            i = i - 1
            break
          }

          event.action[camelCase(attr.key)] = attr.value
        }
      } else {
        event[camelCase(attr.key)] = attr.value
      }
    }

    return contractEvents
}