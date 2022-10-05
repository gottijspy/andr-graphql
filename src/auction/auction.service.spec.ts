import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AuctionService } from './auction.service'

describe('AuctionService', () => {
  let service: AuctionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionService,
        {
          provide: getLoggerToken(AuctionService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: WasmService,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AuctionService>(AuctionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
