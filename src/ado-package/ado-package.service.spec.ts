import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { AdoPackageService } from './ado-package.service'

describe('AdoPackageService', () => {
  let service: AdoPackageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdoPackageService,
        {
          provide: getLoggerToken(AdoPackageService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getModelToken('AdoPackage'),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AdoPackageService>(AdoPackageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
