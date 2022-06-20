import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { getCosmToken } from 'src/cosm'
import { AddressListAdoService } from './address-list.service'

describe('AddressListAdoService', () => {
  let service: AddressListAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressListAdoService,
        {
          provide: getLoggerToken(AddressListAdoService.name),
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

    service = module.get<AddressListAdoService>(AddressListAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
