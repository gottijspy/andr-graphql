import { Module } from '@nestjs/common'
import { MissionAdoResolver } from './mission.resolver'
import { MissionAdoService } from './mission.service'

@Module({
  providers: [MissionAdoResolver, MissionAdoService],
})
export class MissionAdoModule {}
