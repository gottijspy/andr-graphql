import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { CW20TokenAdoService } from './cw20-token.service'

describe('CW20TokenAdoService', () => {
  let service: CW20TokenAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CW20TokenAdoService,
        {
          provide: getLoggerToken(CW20TokenAdoService.name),
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

    service = module.get<CW20TokenAdoService>(CW20TokenAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
