import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { PrimitiveAdoService } from './primitive.service'

describe('PrimitiveAdoService', () => {
  let service: PrimitiveAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrimitiveAdoService,
        {
          provide: getLoggerToken(PrimitiveAdoService.name),
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

    service = module.get<PrimitiveAdoService>(PrimitiveAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
