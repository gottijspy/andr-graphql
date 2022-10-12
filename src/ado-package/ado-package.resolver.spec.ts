import { Test, TestingModule } from '@nestjs/testing'
import { AdoPackageResolver } from './ado-package.resolver'
import { AdoPackageService } from './ado-package.service'

describe('AdoPackageResolver', () => {
  let resolver: AdoPackageResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoPackageResolver, { provide: AdoPackageService, useValue: {} }],
    }).compile()

    resolver = module.get<AdoPackageResolver>(AdoPackageResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
