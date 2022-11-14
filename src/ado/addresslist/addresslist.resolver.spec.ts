import { Test, TestingModule } from '@nestjs/testing'
import { AddresslistResolver } from './addresslist.resolver'
import { AddresslistService } from './addresslist.service'

describe('AddresslistResolver', () => {
  let resolver: AddresslistResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddresslistResolver, { provide: AddresslistService, useValue: {} }],
    }).compile()

    resolver = module.get<AddresslistResolver>(AddresslistResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
