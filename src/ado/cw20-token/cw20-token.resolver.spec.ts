import { Test, TestingModule } from '@nestjs/testing'
import { CW20TokenAdoResolver } from './cw20-token.resolver'
import { CW20TokenAdoService } from './cw20-token.service'

describe('CW20TokenAdoResolver', () => {
  let resolver: CW20TokenAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CW20TokenAdoResolver, { provide: CW20TokenAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<CW20TokenAdoResolver>(CW20TokenAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
