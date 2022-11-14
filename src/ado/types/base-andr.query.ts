import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseAdoContract {
  @Field(() => Int, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `codeId` field on `andr` to resolve this query.',
  })
  codeId?: number

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `creator` field on `andr` to resolve this query.',
  })
  creator?: string

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `admin` field on `andr` to resolve this query.',
  })
  admin?: string

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `label` field on `andr` to resolve this query.',
  })
  label?: string

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `ibcPortId` field on `andr` to resolve this query.',
  })
  ibcPortId?: string

  @Field(() => [String], {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `queries_expected` field on `andr` to resolve this query.',
  })
  queries_expected?: string[]

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `owner` field on `andr` to resolve this query.',
  })
  owner?: string

  @Field(() => [String], {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `operators` field on `andr` to resolve this query.',
  })
  operators?: string[]

  @Field(() => Boolean, {
    nullable: true,
    deprecationReason: 'Moved to `andr` query resolver, use `operators` field on `andr` to resolve this query.',
  })
  isOperator?: boolean
}
