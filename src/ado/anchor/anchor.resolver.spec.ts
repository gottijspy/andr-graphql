import { Test, TestingModule } from '@nestjs/testing'
import { AnchorResolver } from './anchor.resolver'
import { AnchorService } from './anchor.service'

describe('AnchorResolver', () => {
  let resolver: AnchorResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnchorResolver, { provide: AnchorService, useValue: {} }],
    }).compile()

    resolver = module.get<AnchorResolver>(AnchorResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
