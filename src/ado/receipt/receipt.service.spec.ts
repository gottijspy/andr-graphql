import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { ReceiptAdoService } from './receipt.service'

describe('ReceiptAdoService', () => {
  let service: ReceiptAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptAdoService,
        {
          provide: getLoggerToken(ReceiptAdoService.name),
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

    service = module.get<ReceiptAdoService>(ReceiptAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
