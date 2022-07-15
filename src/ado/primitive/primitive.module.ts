import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { PrimitiveAdoResolver } from './primitive.resolver'
import { PrimitiveAdoService } from './primitive.service'

@Module({
  imports: [WasmModule],
  providers: [PrimitiveAdoResolver, PrimitiveAdoService],
})
export class PrimitiveAdoModule {}
