import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { TxService } from 'src/tx/tx.service'
import { WasmService } from 'src/wasm/wasm.service'
import { AssetsService } from './assets.service'

describe('AssetsService', () => {
  let service: AssetsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        {
          provide: getLoggerToken(AssetsService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: TxService,
          useValue: {},
        },
        {
          provide: WasmService,
          useValue: {},
        },
        {
          provide: getModelToken('Ado'),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AssetsService>(AssetsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
