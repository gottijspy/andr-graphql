import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AnchorResolver } from './anchor.resolver'
import { AnchorService } from './anchor.service'

@Module({
  imports: [WasmModule],
  providers: [AnchorResolver, AnchorService],
})
export class AnchorModule {}
