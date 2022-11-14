import { Test, TestingModule } from '@nestjs/testing'
import { PrimitiveResolver } from './primitive.resolver'
import { PrimitiveService } from './primitive.service'

describe('PrimitiveResolver', () => {
  let resolver: PrimitiveResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimitiveResolver, { provide: PrimitiveService, useValue: {} }],
    }).compile()

    resolver = module.get<PrimitiveResolver>(PrimitiveResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
