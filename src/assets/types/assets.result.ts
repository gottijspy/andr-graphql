import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/ado/types/ado.enums'
import { AppComponent } from 'src/app/types'
import { NftInfo } from 'src/cw721/types'

@ObjectType()
export class AssetResult {
  @Field()
  owner!: string

  @Field()
  address!: string

  @Field()
  adoType!: string

  @Field(() => Int, { nullable: true })
  instantiateHeight?: number

  @Field(() => Int, { nullable: true })
  lastUpdatedHeight?: number

  @Field({ nullable: true })
  instantiateHash?: string

  @Field({ nullable: true })
  lastUpdatedHash?: string

  @Field({ nullable: true })
  appContract?: string

  @Field({ nullable: true })
  chainId?: string

  @Field(() => [AppComponent], { nullable: true })
  components?: AppComponent[]

  @Field(() => [NftInfo], { nullable: true })
  tokens?: NftInfo[]
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  offset = 0

  @Field(() => Int)
  limit = 10
}

@ArgsType()
export class AppComponentFilterArgs extends PaginationArgs {
  @Field(() => AdoType, { nullable: true })
  componentType?: AdoType
}

@ArgsType()
export class AssetFilterArgs extends PaginationArgs {
  @Field(() => AdoType, { nullable: true })
  adoType?: AdoType
}
