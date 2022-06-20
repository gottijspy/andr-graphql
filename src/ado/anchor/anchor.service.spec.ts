import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { AnchorAdoService } from './anchor.service'

describe('AnchorAdoService', () => {
  let service: AnchorAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnchorAdoService,
        {
          provide: getLoggerToken(AnchorAdoService.name),
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

    service = module.get<AnchorAdoService>(AnchorAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
