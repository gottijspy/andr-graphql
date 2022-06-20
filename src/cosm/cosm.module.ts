import { Module, DynamicModule } from '@nestjs/common'
import { CosmCoreModule } from './cosm-core.module'
import { CosmModuleOptions, CosmModuleAsyncOptions } from './cosm.interface'

@Module({})
export class CosmModule {
  static forRoot(options: CosmModuleOptions): DynamicModule {
    return {
      module: CosmModule,
      imports: [CosmCoreModule.forRoot(options)],
    }
  }

  static forRootAsync(options: CosmModuleAsyncOptions): DynamicModule {
    return {
      module: CosmModule,
      imports: [CosmCoreModule.forRootAsync(options)],
    }
  }
}
