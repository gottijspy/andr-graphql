import { Test, TestingModule } from '@nestjs/testing'
import { VaultAdoResolver } from './vault-ado.resolver'
import { VaultAdoService } from './vault-ado.service'

describe('VaultAdoResolver', () => {
  let resolver: VaultAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaultAdoResolver, { provide: VaultAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<VaultAdoResolver>(VaultAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
