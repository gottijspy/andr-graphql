import { Test, TestingModule } from '@nestjs/testing'
import { AdoAppResolver } from './app.resolver'
import { AdoAppService } from './app.service'

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
