import { Module } from '@nestjs/common'
import { PrimitiveAdoResolver } from './primitive-ado.resolver'
import { PrimitiveAdoService } from './primitive-ado.service'

@Module({
  providers: [PrimitiveAdoResolver, PrimitiveAdoService],
})
export class PrimitiveAdoModule {}
