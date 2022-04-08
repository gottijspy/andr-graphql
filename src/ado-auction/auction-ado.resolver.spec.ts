import { Test, TestingModule } from '@nestjs/testing'
import { AuctionAdoResolver } from './auction-ado.resolver'
import { AuctionAdoService } from './auction-ado.service'

describe('AuctionAdoResolver', () => {
  let resolver: AuctionAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionAdoResolver, { provide: AuctionAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<AuctionAdoResolver>(AuctionAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
