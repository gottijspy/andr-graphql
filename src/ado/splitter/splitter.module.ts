import { Module } from '@nestjs/common'
import { SplitterAdoResolver } from './splitter.resolver'
import { SplitterAdoService } from './splitter.service'

@Module({
  providers: [SplitterAdoResolver, SplitterAdoService],
})
export class SplitterAdoModule {}
