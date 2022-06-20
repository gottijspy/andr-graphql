import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Provider } from '@nestjs/common'
import { defer, lastValueFrom } from 'rxjs'
import { COSM_MODULE_OPTIONS } from './cosm.constants'
import { CosmModuleOptions, CosmModuleAsyncOptions } from './cosm.interface'
import { getCosmToken } from './cosm.utils'

export async function createCosmClient(options: CosmModuleOptions): Promise<CosmWasmClient> {
  const queryClient = await CosmWasmClient.connect(options.RPC_URL)
  return queryClient
}

export function createCosmProvider(options: CosmModuleOptions): Provider {
  return {
    provide: getCosmToken(),
    useFactory: async (): Promise<CosmWasmClient> => {
      return await lastValueFrom(defer(() => createCosmClient(options)))
    },
  }
}

export function createCosmAsyncProvider(): Provider {
  return {
    provide: getCosmToken(),
    useFactory: async (options: CosmModuleOptions): Promise<CosmWasmClient> => {
      return await lastValueFrom(defer(() => createCosmClient(options)))
    },
    inject: [COSM_MODULE_OPTIONS],
  }
}

export function createAsyncOptionsProvider(options: CosmModuleAsyncOptions): Provider {
  return {
    provide: COSM_MODULE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject || [],
  }
}
