import { Test, TestingModule } from '@nestjs/testing'
import { RatesResolver } from './rates.resolver'
import { RatesService } from './rates.service'

describe('RatesResolver', () => {
  let resolver: RatesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatesResolver, { provide: RatesService, useValue: {} }],
    }).compile()

    resolver = module.get<RatesResolver>(RatesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
