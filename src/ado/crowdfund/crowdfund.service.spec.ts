import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { CrowdfundAdoService } from './crowdfund.service'

describe('CrowdfundAdoService', () => {
  let service: CrowdfundAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrowdfundAdoService,
        {
          provide: getLoggerToken(CrowdfundAdoService.name),
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

    service = module.get<CrowdfundAdoService>(CrowdfundAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
