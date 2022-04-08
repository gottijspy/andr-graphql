import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { OffersAdoService } from './offers-ado.service'

describe('OffersAdoService', () => {
  let service: OffersAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersAdoService,
        {
          provide: getLoggerToken(OffersAdoService.name),
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

    service = module.get<OffersAdoService>(OffersAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
