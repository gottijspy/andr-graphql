//import { Field, ObjectType } from '@nestjs/graphql'
//import { AdoType } from 'src/common/enums'
import { AndrModule } from './andr-module.model'

export interface BaseAdo {
  adoId: string
  adoName: string
  readonly adoType: string
  primitiveContract?: string
  operators?: string[]
  modules?: Promise<AndrModule[]>
}

// @ObjectType()
// export class Ado {
//   @Field(() => AdoType)
//   adoType!: number

//   @Field({ nullable: true })
//   primitiveContract?: string

//   @Field(() => [String], { nullable: true })
//   operators?: string[]

//   @Field(() => [AndrModule], { nullable: true })
//   modules?: Promise<AndrModule[]>
// }
