import { Module } from '@nestjs/common'
import { AnchorAdoResolver } from './anchor-ado.resolver'
import { AnchorAdoService } from './anchor-ado.service'

@Module({
  providers: [AnchorAdoResolver, AnchorAdoService],
})
export class AnchorAdoModule {}
