import { Module } from '@nestjs/common'
import { TimelockAdoResolver } from './timelock.resolver'
import { TimelockAdoService } from './timelock.service'

@Module({
  providers: [TimelockAdoResolver, TimelockAdoService],
})
export class TimelockAdoModule {}
