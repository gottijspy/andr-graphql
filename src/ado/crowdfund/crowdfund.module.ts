import { Module } from '@nestjs/common'
import { WasmModule } from 'src/wasm/wasm.module'
import { CrowdfundResolver } from './crowdfund.resolver'
import { CrowdfundService } from './crowdfund.service'

@Module({
  imports: [WasmModule],
  providers: [CrowdfundResolver, CrowdfundService],
})
export class CrowdfundModule {}
