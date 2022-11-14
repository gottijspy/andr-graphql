import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { KeplrConfigService } from './keplr-config.service'

describe('KeplrConfigService', () => {
  let service: KeplrConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeplrConfigService,
        {
          provide: getLoggerToken(KeplrConfigService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getModelToken('KeplrConfig'),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<KeplrConfigService>(KeplrConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
