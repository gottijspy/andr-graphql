import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from 'src/app/app.service'
import { CW721Service } from 'src/cw721/cw721.service'
import { AssetsResolver } from './assets.resolver'
import { AssetsService } from './assets.service'

describe('AssetsResolver', () => {
  let resolver: AssetsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsResolver,
        { provide: AssetsService, useValue: {} },
        { provide: AppService, useValue: {} },
        { provide: CW721Service, useValue: {} },
      ],
    }).compile()

    resolver = module.get<AssetsResolver>(AssetsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
