import { Test, TestingModule } from '@nestjs/testing'
import { NftCollectibleAdoResolver } from './nft.resolver'
import { NftCollectibleAdoService } from './nft.service'

describe('NftCollectibleAdoResolver', () => {
  let resolver: NftCollectibleAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftCollectibleAdoResolver, { provide: NftCollectibleAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<NftCollectibleAdoResolver>(NftCollectibleAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
