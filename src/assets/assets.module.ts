import { Module } from '@nestjs/common'
import { TxModule } from 'src/tx/tx.module'
import { AssetsResolver } from './assets.resolver'
import { AssetsService } from './assets.service'

@Module({
  imports: [TxModule],
  providers: [AssetsResolver, AssetsService],
})
export class AssetsModule {}
