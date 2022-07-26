import { Module } from '@nestjs/common'
import { TxResolver } from './tx.resolver'
import { TxService } from './tx.service'

@Module({
  providers: [TxResolver, TxService],
  exports: [TxService],
})
export class TxModule {}
