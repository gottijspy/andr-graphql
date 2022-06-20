import { ModuleMetadata } from '@nestjs/common/interfaces'

export interface CosmModuleOptions extends Record<string, any> {
  RPC_URL: string
}

export interface CosmModuleAsyncOptions extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => CosmModuleOptions | Promise<CosmModuleOptions>
  inject?: any[]
}
