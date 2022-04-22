import { Test, TestingModule } from '@nestjs/testing'
import { AnchorAdoResolver } from './anchor.resolver'
import { AnchorAdoService } from './anchor.service'

describe('AnchorAdoResolver', () => {
  let resolver: AnchorAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnchorAdoResolver, { provide: AnchorAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<AnchorAdoResolver>(AnchorAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
