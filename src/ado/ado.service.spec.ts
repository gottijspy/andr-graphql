import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { AdoService } from './ado.service'

describe('TxService', () => {
  let service: AdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdoService,
        {
          provide: getLoggerToken(AdoService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AdoService>(AdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
