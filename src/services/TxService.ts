import { Repository, EntityManager } from 'typeorm'
import { Container, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { TxEntity } from 'orm'

@Service()
export class TxService {
    constructor(
        @InjectRepository(TxEntity) private readonly repo: Repository<TxEntity>
    ) {}

    async newTx(tx: Partial<TxEntity>, manager?: EntityManager): Promise<TxEntity> {
        return manager ? manager.save(new TxEntity(tx)) : this.repo.save(tx)
    }

    async getHistory(
        sender: string,
        offset: number,
        limit: number,
        repo = this.repo
      ): Promise<TxEntity[]> {
        let qb = repo
          .createQueryBuilder()
          .where('sender = :sender', { sender })
          .skip(offset)
          .take(limit)
          .orderBy('id', 'DESC')
        return qb.getMany()
      }
}


export function txService(): TxService {
    return Container.get(TxService)
}
