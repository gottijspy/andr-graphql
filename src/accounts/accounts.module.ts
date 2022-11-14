import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AccountsResolver } from './accounts.resolver'
import { AccountsService } from './accounts.service'
import { Ado, AdoSchema } from './assets/types'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ado.name, schema: AdoSchema }])],
  providers: [AccountsResolver, AccountsService],
})
export class AccountsModule {}
