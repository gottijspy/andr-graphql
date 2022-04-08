import { Test, TestingModule } from '@nestjs/testing'
import { TokenAdoResolver } from './token-ado.resolver'
import { TokenAdoService } from './token-ado.service'

describe('TokenAdoResolver', () => {
  let resolver: TokenAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenAdoResolver, { provide: TokenAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<TokenAdoResolver>(TokenAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
