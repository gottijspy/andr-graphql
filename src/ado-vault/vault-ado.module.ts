import { Module } from '@nestjs/common'
import { VaultAdoResolver } from './vault-ado.resolver'
import { VaultAdoService } from './vault-ado.service'

@Module({
  providers: [VaultAdoResolver, VaultAdoService],
})
export class VaultAdoModule {}
