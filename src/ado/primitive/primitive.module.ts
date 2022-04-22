import { Module } from '@nestjs/common'
import { PrimitiveAdoResolver } from './primitive.resolver'
import { PrimitiveAdoService } from './primitive.service'

@Module({
  providers: [PrimitiveAdoResolver, PrimitiveAdoService],
})
export class PrimitiveAdoModule {}
