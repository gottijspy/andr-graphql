import { Module } from '@nestjs/common'
import { AdoResolver } from './ado.resolver'
import { AdoService } from './ado.service'

@Module({
  providers: [AdoResolver, AdoService],
})
export class AdoModule {}
