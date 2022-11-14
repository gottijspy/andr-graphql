import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

@Module({
  imports: [WasmModule],
  providers: [AppResolver, AppService],
})
export class AppAdoModule {}
