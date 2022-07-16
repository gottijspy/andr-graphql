import { Test, TestingModule } from '@nestjs/testing'
import { TimelockResolver } from './timelock.resolver'
import { TimelockService } from './timelock.service'

describe('TimelockResolver', () => {
  let resolver: TimelockResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelockResolver, { provide: TimelockService, useValue: {} }],
    }).compile()

    resolver = module.get<TimelockResolver>(TimelockResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
