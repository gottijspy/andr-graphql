import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { VaultResolver } from './vault.resolver'
import { VaultService } from './vault.service'

@Module({
  imports: [WasmModule],
  providers: [VaultResolver, VaultService],
})
export class VaultModule {}
