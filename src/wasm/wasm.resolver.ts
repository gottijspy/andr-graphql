import { Args, Query, Resolver } from '@nestjs/graphql'
import { WasmContract, WasmContractResult } from './types/wasm.contract'
import { WasmService } from './wasm.service'

@Resolver(WasmContract)
export class WasmResolver {
  constructor(private readonly wasmService: WasmService) {}

  @Query(() => WasmContractResult)
  public async wasm(@Args('address') address: string): Promise<typeof WasmContractResult> {
    const contractInfo = await this.wasmService.getContract(address)
    console.log(contractInfo)
    if ('error' in contractInfo) {
      return contractInfo
    }

    return contractInfo as WasmContract
  }
}
