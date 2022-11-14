import { Test, TestingModule } from '@nestjs/testing'
import { AndrQueryResolver } from './andr-query.resolver'
import { AndrQueryService } from './andr-query.service'

describe('AndrQueryResolver', () => {
  let resolver: AndrQueryResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AndrQueryResolver, { provide: AndrQueryService, useValue: {} }],
    }).compile()

    resolver = module.get<AndrQueryResolver>(AndrQueryResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
