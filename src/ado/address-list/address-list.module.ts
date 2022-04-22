import { Module } from '@nestjs/common'
import { AddressListAdoResolver } from './address-list.resolver'
import { AddressListAdoService } from './address-list.service'

@Module({
  providers: [AddressListAdoResolver, AddressListAdoService],
})
export class AddressListAdoModule {}
