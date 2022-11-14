import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { PrimitiveResolver } from './primitive.resolver'
import { PrimitiveService } from './primitive.service'

@Module({
  imports: [WasmModule],
  providers: [PrimitiveResolver, PrimitiveService],
})
export class PrimitiveModule {}
