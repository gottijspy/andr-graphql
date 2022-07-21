import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getCosmToken } from 'src/cosm'
import { TxResolver } from './tx.resolver'
import { TxService } from './tx.service'

describe('TxResolver', () => {
  let resolver: TxResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TxResolver,
        TxService,
        {
          provide: getLoggerToken(TxService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getCosmToken(),
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<TxResolver>(TxResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
