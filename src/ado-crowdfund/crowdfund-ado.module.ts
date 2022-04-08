import { Module } from '@nestjs/common'
import { CrowdfundAdoResolver } from './crowdfund-ado.resolver'
import { CrowdfundAdoService } from './crowdfund-ado.service'

@Module({
  providers: [CrowdfundAdoResolver, CrowdfundAdoService],
})
export class CrowdfundAdoModule {}
