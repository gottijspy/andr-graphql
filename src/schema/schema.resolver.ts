import { Args, Query, Resolver } from '@nestjs/graphql'
import { AdoType } from 'src/ado/types/ado.enums'
import { SchemaService } from './schema.service'
import { SchemaTS } from './schema.type'

@Resolver(SchemaTS)
export class SchemaResolver {
  constructor(private readonly schemaService: SchemaService) {}

  @Query(() => SchemaTS)
  public async schema(@Args('adoType') adoType: AdoType): Promise<SchemaTS> {
    const schemaObj = await this.schemaService.generateSchema(adoType)
    return { schema: schemaObj } as SchemaTS
  }
}
