import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { CW20TokenAdoResolver } from './cw20-token.resolver'
import { CW20TokenAdoService } from './cw20-token.service'

@Module({
  imports: [WasmModule],
  providers: [CW20TokenAdoResolver, CW20TokenAdoService],
})
export class CW20TokenAdoModule {}
