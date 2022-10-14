import { Field, ObjectType } from '@nestjs/graphql'
import { AdoPackage } from './ado-package.schema'

@ObjectType()
export class ADOPQuery {
  @Field(() => [String])
  adoTypes!: Promise<string[]>

  @Field(() => AdoPackage)
  package!: Promise<AdoPackage>
}

