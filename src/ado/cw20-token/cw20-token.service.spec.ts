import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { CW20TokenService } from './cw20-token.service'

describe('CW20TokenService', () => {
  let service: CW20TokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CW20TokenService,
        {
          provide: getLoggerToken(CW20TokenService.name),
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

    service = module.get<CW20TokenService>(CW20TokenService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
