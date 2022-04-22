import { Module } from '@nestjs/common'
import { CrowdfundAdoResolver } from './crowdfund.resolver'
import { CrowdfundAdoService } from './crowdfund.service'

@Module({
  providers: [CrowdfundAdoResolver, CrowdfundAdoService],
})
export class CrowdfundAdoModule {}
