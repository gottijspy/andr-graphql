import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AnchorService } from './anchor.service'

describe('AnchorService', () => {
  let service: AnchorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnchorService,
        {
          provide: getLoggerToken(AnchorService.name),
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

    service = module.get<AnchorService>(AnchorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
