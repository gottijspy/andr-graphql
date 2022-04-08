import { Test, TestingModule } from '@nestjs/testing'
import { OffersAdoResolver } from './offers-ado.resolver'
import { OffersAdoService } from './offers-ado.service'

describe('OffersAdoResolver', () => {
  let resolver: OffersAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersAdoResolver, { provide: OffersAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<OffersAdoResolver>(OffersAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
