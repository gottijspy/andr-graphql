import { Test, TestingModule } from '@nestjs/testing'
import { TimelockAdoResolver } from './timelock-ado.resolver'
import { TimelockAdoService } from './timelock-ado.service'

describe('TimelockAdoResolver', () => {
  let resolver: TimelockAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelockAdoResolver, { provide: TimelockAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<TimelockAdoResolver>(TimelockAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
