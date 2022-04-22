import { Test, TestingModule } from '@nestjs/testing'
import { SplitterAdoResolver } from './splitter.resolver'
import { SplitterAdoService } from './splitter.service'

describe('SplitterAdoResolver', () => {
  let resolver: SplitterAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplitterAdoResolver, { provide: SplitterAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<SplitterAdoResolver>(SplitterAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
