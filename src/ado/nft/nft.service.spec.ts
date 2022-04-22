import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { NftCollectibleAdoService } from './nft.service'

describe('NftCollectibleAdoService', () => {
  let service: NftCollectibleAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NftCollectibleAdoService,
        {
          provide: getLoggerToken(NftCollectibleAdoService.name),
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

    service = module.get<NftCollectibleAdoService>(NftCollectibleAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
