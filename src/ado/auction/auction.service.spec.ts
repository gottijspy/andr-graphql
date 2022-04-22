import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { AuctionAdoService } from './auction.service'

describe('AuctionAdoService', () => {
  let service: AuctionAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionAdoService,
        {
          provide: getLoggerToken(AuctionAdoService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AuctionAdoService>(AuctionAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
