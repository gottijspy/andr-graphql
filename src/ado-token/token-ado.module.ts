import { Module } from '@nestjs/common'
import { TokenAdoResolver } from './token-ado.resolver'
import { TokenAdoService } from './token-ado.service'

@Module({
  providers: [TokenAdoResolver, TokenAdoService],
})
export class TokenAdoModule {}
