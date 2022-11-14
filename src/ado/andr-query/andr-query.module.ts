import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AndrQueryResolver } from './andr-query.resolver'
import { AndrQueryService } from './andr-query.service'

@Module({
  imports: [WasmModule],
  providers: [AndrQueryResolver, AndrQueryService],
  exports: [AndrQueryService],
})
export class AndrQueryModule {}
