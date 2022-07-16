import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { CW20TokenResolver } from './cw20-token.resolver'
import { CW20TokenService } from './cw20-token.service'

@Module({
  imports: [WasmModule],
  providers: [CW20TokenResolver, CW20TokenService],
})
export class CW20TokenModule {}
