import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AddresslistService } from './addresslist.service'

describe('AddresslistService', () => {
  let service: AddresslistService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddresslistService,
        {
          provide: getLoggerToken(AddresslistService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: WasmService,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AddresslistService>(AddresslistService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
