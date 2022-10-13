import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/ado/types'
import { AdoPackage } from './ado-package.schema'

@ObjectType()
export class ADOPQuery {
  @Field(() => [String])
  adoTypes!: Promise<string[]>

  @Field(() => AdoPackage)
  package!: Promise<AdoPackage>
}

@ArgsType()
export class ADOPArgs {
  @Field(() => AdoType)
  adoType!: AdoType
}
