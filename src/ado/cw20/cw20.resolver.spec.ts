import { Test, TestingModule } from '@nestjs/testing'
import { CW20Resolver } from './cw20.resolver'
import { CW20Service } from './cw20.service'

describe('CW20Resolver', () => {
  let resolver: CW20Resolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CW20Resolver, { provide: CW20Service, useValue: {} }],
    }).compile()

    resolver = module.get<CW20Resolver>(CW20Resolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
