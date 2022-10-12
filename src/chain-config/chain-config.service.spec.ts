import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { ChainConfigService } from './chain-config.service'

describe('ChainConfigService', () => {
  let service: ChainConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChainConfigService,
        {
          provide: getLoggerToken(ChainConfigService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getModelToken('ChainConfig'),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<ChainConfigService>(ChainConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
