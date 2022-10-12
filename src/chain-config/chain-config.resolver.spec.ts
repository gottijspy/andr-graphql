import { Test, TestingModule } from '@nestjs/testing'
import { ChainConfigResolver } from './chain-config.resolver'
import { ChainConfigService } from './chain-config.service'

describe('ChainConfigResolver', () => {
  let resolver: ChainConfigResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainConfigResolver, { provide: ChainConfigService, useValue: {} }],
    }).compile()

    resolver = module.get<ChainConfigResolver>(ChainConfigResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
