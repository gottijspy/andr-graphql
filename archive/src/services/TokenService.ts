import { Container, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import {
    Repository,
    FindConditions,
    FindOneOptions,
} from 'typeorm'
import { TokenEntity } from 'orm'

@Service()
export class TokenService {
    constructor(
        @InjectRepository(TokenEntity) private readonly repo: Repository<TokenEntity>,
    ) {}

    async get(
        conditions: FindConditions<TokenEntity>,
        options?: FindOneOptions<TokenEntity>,
        repo = this.repo
      ): Promise<TokenEntity> {
        return repo.findOne(conditions, options)
      }
}