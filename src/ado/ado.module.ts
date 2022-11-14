import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AdoResolver } from './ado.resolver'
import { AdoService } from './ado.service'

@Module({
  imports: [WasmModule],
  providers: [AdoResolver, AdoService],
})
export class AdoModule {}
