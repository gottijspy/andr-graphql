import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { CW20Resolver } from './cw20.resolver'
import { CW20Service } from './cw20.service'

@Module({
  imports: [WasmModule],
  providers: [CW20Resolver, CW20Service],
})
export class CW20Module {}
