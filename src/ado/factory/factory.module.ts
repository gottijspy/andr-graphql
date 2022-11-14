import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { FactoryResolver } from './factory.resolver'
import { FactoryService } from './factory.service'

@Module({
  imports: [WasmModule],
  providers: [FactoryResolver, FactoryService],
})
export class FactoryModule {}
