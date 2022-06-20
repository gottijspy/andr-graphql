import { DynamicModule, Global, Module } from '@nestjs/common'
import { CosmModuleOptions, CosmModuleAsyncOptions } from './cosm.interface'
import { createCosmProvider, createCosmAsyncProvider, createAsyncOptionsProvider } from './cosm.providers'

@Global()
@Module({
  providers: [],
  exports: [],
})
export class CosmCoreModule {
  static forRoot(options: CosmModuleOptions): DynamicModule {
    const cosmProvider = createCosmProvider(options)

    return {
      module: CosmCoreModule,
      providers: [cosmProvider],
      exports: [cosmProvider],
    }
  }

  static forRootAsync(options: CosmModuleAsyncOptions): DynamicModule {
    const cosmProvider = createCosmAsyncProvider()
    const asyncOptionsProvider = createAsyncOptionsProvider(options)

    return {
      module: CosmCoreModule,
      imports: options.imports,
      providers: [asyncOptionsProvider, cosmProvider, ...(options.providers || [])],
      exports: [cosmProvider],
    }
  }
}
