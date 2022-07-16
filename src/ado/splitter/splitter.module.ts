import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { SplitterResolver } from './splitter.resolver'
import { SplitterService } from './splitter.service'

@Module({
  imports: [WasmModule],
  providers: [SplitterResolver, SplitterService],
})
export class SplitterModule {}
