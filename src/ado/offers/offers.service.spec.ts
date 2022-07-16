import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { OffersService } from './offers.service'

describe('OffersService', () => {
  let service: OffersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        {
          provide: getLoggerToken(OffersService.name),
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

    service = module.get<OffersService>(OffersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
