import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TxModule } from 'src/tx/tx.module'
import { WasmModule } from 'src/wasm/wasm.module'
import { AssetsResolver } from './assets.resolver'
import { AssetsService } from './assets.service'
import { Ado, AdoSchema } from './types'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ado.name, schema: AdoSchema }]), WasmModule, TxModule],
  providers: [AssetsResolver, AssetsService],
})
export class AssetsModule {}
