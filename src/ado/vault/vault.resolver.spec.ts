import { Test, TestingModule } from '@nestjs/testing'
import { VaultResolver } from './vault.resolver'
import { VaultService } from './vault.service'

describe('VaultResolver', () => {
  let resolver: VaultResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaultResolver, { provide: VaultService, useValue: {} }],
    }).compile()

    resolver = module.get<VaultResolver>(VaultResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
