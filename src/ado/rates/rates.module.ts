import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { RatesResolver } from './rates.resolver'
import { RatesService } from './rates.service'

@Module({
  imports: [WasmModule],
  providers: [RatesResolver, RatesService],
})
export class RatesModule {}
