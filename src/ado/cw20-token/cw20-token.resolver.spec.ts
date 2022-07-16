import { Test, TestingModule } from '@nestjs/testing'
import { CW20TokenResolver } from './cw20-token.resolver'
import { CW20TokenService } from './cw20-token.service'

describe('CW20TokenResolver', () => {
  let resolver: CW20TokenResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CW20TokenResolver, { provide: CW20TokenService, useValue: {} }],
    }).compile()

    resolver = module.get<CW20TokenResolver>(CW20TokenResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
