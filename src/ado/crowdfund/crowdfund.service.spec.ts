import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { CrowdfundAdoService } from './crowdfund.service'

describe('CrowdfundAdoService', () => {
  let service: CrowdfundAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrowdfundAdoService,
        {
          provide: getLoggerToken(CrowdfundAdoService.name),
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

    service = module.get<CrowdfundAdoService>(CrowdfundAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
