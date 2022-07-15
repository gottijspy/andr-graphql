import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { CrowdfundAdoResolver } from './crowdfund.resolver'
import { CrowdfundAdoService } from './crowdfund.service'

@Module({
  imports: [WasmModule],
  providers: [CrowdfundAdoResolver, CrowdfundAdoService],
})
export class CrowdfundAdoModule {}
