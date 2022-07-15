import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AdoAppResolver } from './app.resolver'
import { AdoAppService } from './app.service'

@Module({
  imports: [WasmModule],
  providers: [AdoAppResolver, AdoAppService],
})
export class AppAdoModule {}
