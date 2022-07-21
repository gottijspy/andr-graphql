import { ArgsType, createUnionType, Field, Int, InterfaceType, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@InterfaceType()
export abstract class BaseContract {
  @Field(() => String)
  address!: string

  @Field(() => Int)
  codeId!: number

  /** Bech32 account address */
  @Field(() => String)
  creator!: string

  /** Bech32-encoded admin address */
  @Field(() => String, { nullable: true })
  admin?: string

  @Field(() => String)
  label!: string

  /**
   * The IBC port ID assigned to this contract by wasmd.
   *
   * This is set for all IBC contracts (https://github.com/CosmWasm/wasmd/blob/v0.16.0/x/wasm/keeper/keeper.go#L299-L306).
   */
  @Field(() => String, { nullable: true })
  ibcPortId?: string

  @Field(() => [String], { nullable: true })
  queries_expected?: string[]
}

@ObjectType({
  implements: [BaseContract],
})
export class WasmContract implements BaseContract {
  @Field(() => String)
  address!: string

  @Field(() => Int)
  codeId!: number

  @Field(() => String)
  creator!: string

  @Field(() => String, { nullable: true })
  admin?: string

  @Field(() => String)
  label!: string

  @Field(() => String, { nullable: true })
  ibcPortId?: string

  @Field(() => [String], { nullable: true })
  queries_expected?: string[]

  @Field(() => GraphQLJSON, { nullable: true })
  queryMsg?: JSON
}

@ArgsType()
export class WasmQueryArgs {
  @Field(() => GraphQLJSON)
  message!: Record<string, any>
}

@ObjectType()
export class WasmContractError {
  @Field(() => Int, { nullable: true })
  code?: number

  @Field()
  error!: string
}

@ObjectType()
export class WasmContractQueryError extends WasmContractError {
  @Field(() => GraphQLJSON)
  queryMsg!: Record<string, unknown>
}

export const WasmContractResult = createUnionType({
  name: 'WasmContractResult',
  types: () => [WasmContract, WasmContractError] as const,
  resolveType: (value) => {
    if (value.error) {
      return WasmContractError
    }

    return WasmContract
  },
})
