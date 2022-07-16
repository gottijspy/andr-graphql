import { Test, TestingModule } from '@nestjs/testing'
import { CrowdfundResolver } from './crowdfund.resolver'
import { CrowdfundService } from './crowdfund.service'

describe('CrowdfundResolver', () => {
  let resolver: CrowdfundResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrowdfundResolver, { provide: CrowdfundService, useValue: {} }],
    }).compile()

    resolver = module.get<CrowdfundResolver>(CrowdfundResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
