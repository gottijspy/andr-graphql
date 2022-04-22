import { Module } from '@nestjs/common'
import { VaultAdoResolver } from './vault.resolver'
import { VaultAdoService } from './vault.service'

@Module({
  providers: [VaultAdoResolver, VaultAdoService],
})
export class VaultAdoModule {}
