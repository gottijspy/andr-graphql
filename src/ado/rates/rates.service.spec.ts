import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { RatesAdoService } from './rates.service'

describe('RatesAdoService', () => {
  let service: RatesAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatesAdoService,
        {
          provide: getLoggerToken(RatesAdoService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
        {
          provide: getCosmToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<RatesAdoService>(RatesAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
