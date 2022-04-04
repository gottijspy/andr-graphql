import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { Token } from 'graphql/schema'
import { TokenService } from 'services'

@Service()
@Resolver((of) => Token)
export class TokenResolver {
    constructor(private readonly tokenService: TokenService) {}
  @Query((returns) => Token)
  async token(
    @Arg('token') token: string,
  ): Promise<Token> {
    return this.tokenService.get({token})
  }
}