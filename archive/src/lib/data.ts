import * as fs from 'fs'
import { Contracts } from 'types'

const CONTRACTS_PATH = './data/contracts.json'


export function loadJSON(path: string): unknown {
    try {
      const data = JSON.parse(fs.readFileSync(path, 'utf8'))
      return data
    } catch (error) {
      throw new Error(`not provided ${path}`)
    }
}

export function loadContracts(): Contracts | undefined {
    return loadJSON(CONTRACTS_PATH) as Contracts
}