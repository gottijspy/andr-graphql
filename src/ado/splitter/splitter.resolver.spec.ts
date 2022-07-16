import { Test, TestingModule } from '@nestjs/testing'
import { SplitterResolver } from './splitter.resolver'
import { SplitterService } from './splitter.service'

describe('SplitterResolver', () => {
  let resolver: SplitterResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplitterResolver, { provide: SplitterService, useValue: {} }],
    }).compile()

    resolver = module.get<SplitterResolver>(SplitterResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
