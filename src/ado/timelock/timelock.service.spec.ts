import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { TimelockAdoService } from './timelock.service'

describe('TimelockAdoService', () => {
  let service: TimelockAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimelockAdoService,
        {
          provide: getLoggerToken(TimelockAdoService.name),
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

    service = module.get<TimelockAdoService>(TimelockAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
