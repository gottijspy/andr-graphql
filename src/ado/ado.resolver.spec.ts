import { Test, TestingModule } from '@nestjs/testing'
import { AdoResolver } from './ado.resolver'
import { AdoService } from './ado.service'

describe('TxResolver', () => {
  let resolver: AdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoResolver, { provide: AdoService, useValue: {} }],
    }).compile()

    resolver = module.get<AdoResolver>(AdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
