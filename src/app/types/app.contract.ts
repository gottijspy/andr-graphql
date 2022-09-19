import { ArgsType, createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { NftInfo } from '../../cw721/types'

@ObjectType()
export class AppContract extends AdoContract {
  @Field(() => AppConfig, { nullable: true })
  config?: Promise<AppConfig>

  @Field(() => String, { nullable: true })
  getAddress?: Promise<string>

  @Field(() => [AppComponentAddress], { nullable: true })
  addresses?: Promise<AppComponentAddress[]>

  @Field(() => Boolean, { nullable: true })
  componentExists?: Promise<boolean>

  @Field(() => [AppComponent], { nullable: true })
  components?: Promise<AppComponent[]>
}

@ObjectType()
export class AppComponent {
  @Field()
  name!: string

  @Field()
  ado_type!: string

  @Field()
  instantiate_msg!: string

  @Field({ nullable: true })
  address?: string

  @Field(() => AdoContract, { nullable: true })
  ado?: Promise<AdoContract>

  @Field(() => [NftInfo], { nullable: true })
  tokens?: Promise<NftInfo[]>
}

@ObjectType()
export class AppConfig {
  @Field()
  name!: string

  @Field()
  owner!: string
}

@ObjectType()
export class AppComponentAddress {
  @Field()
  name!: string

  @Field()
  address!: string
}

@ArgsType()
export class ComponentFilterArgs {
  @Field(() => AdoType, { nullable: true })
  adoType?: AdoType
}

export const AdoAppResult = createUnionType({
  name: 'AdoAppResult',
  types: () => [AppContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.App) {
      return AppContract
    }

    return AdoContractError
  },
})
