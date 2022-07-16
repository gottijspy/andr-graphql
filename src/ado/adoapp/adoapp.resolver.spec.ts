import { Test, TestingModule } from '@nestjs/testing'
import { AdoAppResolver } from './adoapp.resolver'
import { AdoAppService } from './adoapp.service'

describe('AdoAppResolver', () => {
  let resolver: AdoAppResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoAppResolver, { provide: AdoAppService, useValue: {} }],
    }).compile()

    resolver = module.get<AdoAppResolver>(AdoAppResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
