import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from 'src/ado-common/enums'

@ObjectType()
export class AndrMissionComponent {
  @Field()
  name!: string

  @Field(() => AdoType)
  adoType!: string

  @Field()
  instantiateMsg!: string
}
