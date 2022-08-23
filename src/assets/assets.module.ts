import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Ado, AdoSchema } from 'src/ado/types/ado.schema'
import { TxModule } from 'src/tx/tx.module'
import { AssetsResolver } from './assets.resolver'
import { AssetsService } from './assets.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ado.name, schema: AdoSchema }]), TxModule],
  providers: [AssetsResolver, AssetsService],
})
export class AssetsModule {}
