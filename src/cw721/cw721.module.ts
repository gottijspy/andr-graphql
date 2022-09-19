import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { CW721Resolver } from './cw721.resolver'
import { CW721Service } from './cw721.service'

@Module({
  imports: [WasmModule],
  providers: [CW721Resolver, CW721Service],
})
export class CW721Module {}
