import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { SplitterAdoResolver } from './splitter.resolver'
import { SplitterAdoService } from './splitter.service'

@Module({
  imports: [WasmModule],
  providers: [SplitterAdoResolver, SplitterAdoService],
})
export class SplitterAdoModule {}
