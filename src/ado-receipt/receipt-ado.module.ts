import { Module } from '@nestjs/common'
import { ReceiptAdoResolver } from './receipt-ado.resolver'
import { ReceiptAdoService } from './receipt-ado.service'

@Module({
  providers: [ReceiptAdoResolver, ReceiptAdoService],
})
export class ReceiptAdoModule {}
