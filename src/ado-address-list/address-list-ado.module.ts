import { Module } from '@nestjs/common'
import { AddressListAdoResolver } from './address-list-ado.resolver'
import { AddressListAdoService } from './address-list-ado.service'

@Module({
  providers: [AddressListAdoResolver, AddressListAdoService],
})
export class AddressListAdoModule {}
