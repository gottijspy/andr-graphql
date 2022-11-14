import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AddresslistResolver } from './addresslist.resolver'
import { AddresslistService } from './addresslist.service'

@Module({
  imports: [WasmModule],
  providers: [AddresslistResolver, AddresslistService],
})
export class AddresslistModule {}
