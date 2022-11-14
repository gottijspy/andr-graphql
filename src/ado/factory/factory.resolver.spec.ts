import { Test, TestingModule } from '@nestjs/testing'
import { FactoryResolver } from './factory.resolver'
import { FactoryService } from './factory.service'

describe('FactoryResolver', () => {
  let resolver: FactoryResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactoryResolver, { provide: FactoryService, useValue: {} }],
    }).compile()

    resolver = module.get<FactoryResolver>(FactoryResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
