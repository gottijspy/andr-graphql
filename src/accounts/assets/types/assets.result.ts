import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/ado/andr-query/types'

@ObjectType()
export class AssetResult {
  @Field()
  _id!: string

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

  @Field(() => [Component], { nullable: true })
  components?: Component[]

  // @Field(() => [NftInfo], { nullable: true })
  // tokens?: NftInfo[]
}

@ObjectType()
export class Component {
  @Field()
  name!: string

  @Field()
  ado_type!: string

  @Field()
  instantiate_msg!: string

  @Field({ nullable: true })
  address?: string

  // @Field(() => [NftInfo], { nullable: true })
  // tokens?: Promise<NftInfo[]>
}

@ObjectType()
export class ComponentAddress {
  @Field()
  name!: string

  @Field()
  address!: string
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { 
    nullable: true,
    deprecationReason: 'Replaced with cursor based pagination argument, use `startAfter`.',
  })
  offset? = 0

  @Field(() => String, { nullable: true })
  startAfter? = ''

  @Field(() => Int)
  limit = 10
}

@ArgsType()
export class ComponentFilterArgs extends PaginationArgs {
  @Field(() => AdoType, { nullable: true })
  componentType?: AdoType
}

@ArgsType()
export class AssetFilterArgs extends PaginationArgs {
  @Field(() => AdoType, { nullable: true })
  adoType?: AdoType
}
