import { Test, TestingModule } from '@nestjs/testing'
import { RatesAdoResolver } from './rates-ado.resolver'
import { RatesAdoService } from './rates-ado.service'

describe('RatesAdoResolver', () => {
  let resolver: RatesAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatesAdoResolver, { provide: RatesAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<RatesAdoResolver>(RatesAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
