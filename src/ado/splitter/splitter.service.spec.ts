import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { SplitterAdoService } from './splitter.service'

describe('SplitterAdoService', () => {
  let service: SplitterAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SplitterAdoService,
        {
          provide: getLoggerToken(SplitterAdoService.name),
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

    service = module.get<SplitterAdoService>(SplitterAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
