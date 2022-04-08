import { Module } from '@nestjs/common'
import { SplitterAdoResolver } from './splitter-ado.resolver'
import { SplitterAdoService } from './splitter-ado.service'

@Module({
  providers: [SplitterAdoResolver, SplitterAdoService],
})
export class SplitterAdoModule {}
