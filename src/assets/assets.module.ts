import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Ado, AdoSchema } from 'src/ado/types/ado.schema'
import { AppService } from 'src/app/app.service'
import { TxModule } from 'src/tx/tx.module'
import { WasmModule } from 'src/wasm/wasm.module'
import { AssetsResolver } from './assets.resolver'
import { AssetsService } from './assets.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ado.name, schema: AdoSchema }]), WasmModule, TxModule],
  providers: [AssetsResolver, AssetsService, AppService],
})
export class AssetsModule {}
