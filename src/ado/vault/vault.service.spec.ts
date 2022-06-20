import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { VaultAdoService } from './vault.service'

describe('VaultAdoService', () => {
  let service: VaultAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaultAdoService,
        {
          provide: getLoggerToken(VaultAdoService.name),
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

    service = module.get<VaultAdoService>(VaultAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
