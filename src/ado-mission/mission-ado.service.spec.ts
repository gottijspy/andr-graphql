import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { MissionAdoService } from './mission-ado.service'

describe('MissionAdoService', () => {
  let service: MissionAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionAdoService,
        {
          provide: getLoggerToken(MissionAdoService.name),
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

    service = module.get<MissionAdoService>(MissionAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
