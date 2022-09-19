import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { AdoService } from '../ado/ado.service'
import { CW721Service } from '../cw721/cw721.service'
import { AppComponentResolver } from './app-component.resolver'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

@Module({
  imports: [WasmModule],
  providers: [AppResolver, AppService, AppComponentResolver, AdoService, CW721Service],
  exports: [AppService],
})
export class AppAdoModule {}
