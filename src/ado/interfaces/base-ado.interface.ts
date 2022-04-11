import { Field, InterfaceType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { AndrModule } from '../common/models'

export interface IBaseAdo {
  adoId: string
  adoName: string
  adoType: string
  primitiveContract?: string
  operators?: string[]
  modules?: Promise<AndrModule[]>
}

@InterfaceType()
export abstract class BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoName!: string

  @Field()
  adoType!: string

  @Field({ nullable: true })
  primitiveContract?: string

  @Field(() => [String], { nullable: true })
  operators?: string[]

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>

  @Field(() => AnythingScalar)
  contractQuery?: Promise<any>
}
