import { Module } from '@nestjs/common'
import { AnchorAdoResolver } from './anchor.resolver'
import { AnchorAdoService } from './anchor.service'

@Module({
  providers: [AnchorAdoResolver, AnchorAdoService],
})
export class AnchorAdoModule {}
