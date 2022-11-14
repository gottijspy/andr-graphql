import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AndrQueryService } from './andr-query.service'

describe('AndrQueryService', () => {
  let service: AndrQueryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AndrQueryService,
        {
          provide: getLoggerToken(AndrQueryService.name),
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

    service = module.get<AndrQueryService>(AndrQueryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
