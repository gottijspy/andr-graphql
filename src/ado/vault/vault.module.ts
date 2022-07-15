import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { VaultAdoResolver } from './vault.resolver'
import { VaultAdoService } from './vault.service'

@Module({
  imports: [WasmModule],
  providers: [VaultAdoResolver, VaultAdoService],
})
export class VaultAdoModule {}
