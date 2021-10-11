import { Repository, getManager, EntityManager } from 'typeorm'
import { Container, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Contracts, ContractType } from 'types'
import { FactoryEntity, ContractEntity, TokenEntity } from 'orm'
import * as logger from 'lib/logger'
import config from 'config'

@Service()
export class FactoryService {
    private factory: FactoryEntity
    constructor(@InjectRepository(FactoryEntity) private readonly andromedaRepo: Repository<FactoryEntity>) {}

    get(): FactoryEntity {
      if (!this.factory) {
        throw new Error('gov not loaded')
      }
      return this.factory
    }

    async load(id: number): Promise<FactoryEntity> {
        const findOptions = id !== -1 ? { id } : { order: { createdAt: 'DESC' } }
        this.factory = await this.andromedaRepo.findOne(findOptions)
        if (!this.factory) {
          logger.warn(`there is no factory contract. id: ${id}`)
        }
        return this.factory
    }

    async create(contracts: Contracts): Promise<FactoryEntity> {
      return getManager().transaction(async (manager: EntityManager) => {
        const { TERRA_CHAIN_ID: chainId } = config

        const {
          factory
        } = contracts

        const entities = []
        // create factory entity
        const factoryEntity = new FactoryEntity({
          chainId,
          factory,
        })
        entities.push(factoryEntity)
        // create contract entities
        entities.push(
          new ContractEntity({
            address: factory,
            type: ContractType.FACTORY,
            factory: factoryEntity,
          })
        )
        // save to db
        await manager.save(entities)
        return factoryEntity
      })
    }

    createtoken(
      factoryId: number,
      symbol: string,
      name: string,
      minter: string,
      token: string,
    ): unknown[] {
      const asset = new TokenEntity({
        factoryId,
        symbol,
        name,
        minter
      })

      const entities = [
        asset,
        new ContractEntity({ address: token, type: ContractType.TOKEN, factoryId, asset }),
      ]

      logger.info(`new token: ${symbol}`)
      return entities
    }
}


export function factoryService(): FactoryService {
    return Container.get(FactoryService)
}
