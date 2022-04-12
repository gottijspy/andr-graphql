import { Module } from '@nestjs/common'
import { CW20TokenAdoResolver } from './cw20-token-ado.resolver'
import { CW20TokenAdoService } from './cw20-token-ado.service'

@Module({
  providers: [CW20TokenAdoResolver, CW20TokenAdoService],
})
export class CW20TokenAdoModule {}
