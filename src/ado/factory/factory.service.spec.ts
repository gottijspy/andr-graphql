import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { FactoryService } from './factory.service'

describe('FactoryService', () => {
  let service: FactoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FactoryService,
        {
          provide: getLoggerToken(FactoryService.name),
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

    service = module.get<FactoryService>(FactoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
