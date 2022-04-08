import { Module } from '@nestjs/common'
import { MissionAdoResolver } from './mission-ado.resolver'
import { MissionAdoService } from './mission-ado.service'

@Module({
  providers: [MissionAdoResolver, MissionAdoService],
})
export class MissionAdoModule {}
