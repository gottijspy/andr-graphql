import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { PrimitiveAdoService } from './primitive.service'

describe('PrimitiveAdoService', () => {
  let service: PrimitiveAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrimitiveAdoService,
        {
          provide: getLoggerToken(PrimitiveAdoService.name),
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

    service = module.get<PrimitiveAdoService>(PrimitiveAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
