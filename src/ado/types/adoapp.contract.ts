import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'

@ObjectType()
export class AdoAppContract extends AdoContract {
  @Field(() => AppConfig)
  config!: Promise<AppConfig>

  @Field(() => String)
  getAddress!: Promise<string>

  @Field(() => [AppComponentAddress])
  addresses!: Promise<AppComponentAddress[]>

  @Field(() => Boolean)
  componentExists!: Promise<boolean>

  @Field(() => [AppComponent])
  components!: Promise<AppComponent[]>
}

@ObjectType()
export class AppComponent {
  @Field()
  name!: string

  @Field()
  ado_type!: string

  @Field()
  instantiate_msg!: string
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

export const AdoAppContractResult = createUnionType({
  name: 'AdoAppContractResult',
  types: () => [AdoAppContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.App) {
      return AdoAppContract
    }

    return AdoContractError
  },
})
