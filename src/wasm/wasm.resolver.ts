import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { WasmQueryArgs, WasmContract } from './types/wasm.contract'
import { WasmService } from './wasm.service'

@Resolver(WasmContract)
export class WasmResolver {
  constructor(private readonly wasmService: WasmService) {}

  @Query(() => WasmContract, {
    deprecationReason: 'Moved to `ADO` query resolver, use `wasm` field on `ADO` to resolve this query.',
  })
  public async wasm(@Args('address') address: string): Promise<WasmContract> {
    const contractInfo = await this.wasmService.getContract(address)
    return contractInfo
  }

  @ResolveField(() => GraphQLJSON)
  public async queryMsg(@Parent() wasm: WasmContract, @Args() queryArgs: WasmQueryArgs): Promise<JSON> {
    const queryInfo = await this.wasmService.queryContract(wasm.address, queryArgs.message)
    return queryInfo
  }
}
