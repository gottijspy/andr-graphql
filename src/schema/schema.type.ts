import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SchemaTS {

  @Field()
  schema!: string
}