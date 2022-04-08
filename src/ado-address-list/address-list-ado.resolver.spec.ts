import { Test, TestingModule } from '@nestjs/testing'
import { AddressListAdoResolver } from './address-list-ado.resolver'
import { AddressListAdoService } from './address-list-ado.service'

describe('AddressListAdoResolver', () => {
  let resolver: AddressListAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressListAdoResolver, { provide: AddressListAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<AddressListAdoResolver>(AddressListAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
