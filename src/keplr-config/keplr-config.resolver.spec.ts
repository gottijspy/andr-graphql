import { Test, TestingModule } from '@nestjs/testing'
import { KeplrConfigResolver } from './keplr-config.resolver'
import { KeplrConfigService } from './keplr-config.service'

describe('KeplrConfigResolver', () => {
  let resolver: KeplrConfigResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeplrConfigResolver, { provide: KeplrConfigService, useValue: {} }],
    }).compile()

    resolver = module.get<KeplrConfigResolver>(KeplrConfigResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
