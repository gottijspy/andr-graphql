import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AdoAppResolver } from './adoapp.resolver'
import { AdoAppService } from './adoapp.service'

@Module({
  imports: [WasmModule],
  providers: [AdoAppResolver, AdoAppService],
})
export class AdoAppModule {}
