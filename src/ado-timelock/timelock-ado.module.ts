import { Module } from '@nestjs/common'
import { TimelockAdoResolver } from './timelock-ado.resolver'
import { TimelockAdoService } from './timelock-ado.service'

@Module({
  providers: [TimelockAdoResolver, TimelockAdoService],
})
export class TimelockAdoModule {}
