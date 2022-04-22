import { Test, TestingModule } from '@nestjs/testing'
import { PrimitiveAdoResolver } from './primitive.resolver'
import { PrimitiveAdoService } from './primitive.service'

describe('PrimitiveAdoResolver', () => {
  let resolver: PrimitiveAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimitiveAdoResolver, { provide: PrimitiveAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<PrimitiveAdoResolver>(PrimitiveAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
