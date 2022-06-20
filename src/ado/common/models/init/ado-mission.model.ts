import { Field, ObjectType } from '@nestjs/graphql'
import { AppComponent } from 'src/ado/app/types/app.response'
import { BaseAdo } from 'src/ado/common/interfaces'

@ObjectType({
  implements: () => [BaseAdo],
})
export class MissionAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.App

  @Field(() => [String])
  operators!: string[]

  @Field(() => [AppComponent])
  app!: Promise<AppComponent[]>

  @Field()
  name!: string

  @Field()
  primitiveContract!: string
}
