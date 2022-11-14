import { Test, TestingModule } from '@nestjs/testing'
import { CW721Resolver } from './cw721.resolver'
import { CW721Service } from './cw721.service'

describe('CW721Resolver', () => {
  let resolver: CW721Resolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CW721Resolver, { provide: CW721Service, useValue: {} }],
    }).compile()

    resolver = module.get<CW721Resolver>(CW721Resolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
