import { Module } from '@nestjs/common'
import { ReceiptAdoResolver } from './receipt.resolver'
import { ReceiptAdoService } from './receipt.service'

@Module({
  providers: [ReceiptAdoResolver, ReceiptAdoService],
})
export class ReceiptAdoModule {}
