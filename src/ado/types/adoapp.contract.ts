import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { AdoContract, AdoContractError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'

@ObjectType()
export class AdoAppContract extends AdoContract {
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

export const AdoAppResult = createUnionType({
  name: 'AdoAppResult',
  types: () => [AdoAppContract, AdoContractError] as const,
  resolveType: (contract) => {
    if (contract.adoType == AdoType.App) {
      return AdoAppContract
    }

    return AdoContractError
  },
})
