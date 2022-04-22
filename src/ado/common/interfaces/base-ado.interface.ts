import { Field, InterfaceType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { AndrModule } from '../models'

@InterfaceType()
export abstract class BaseAdo {
  @Field()
  adoId!: string

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
