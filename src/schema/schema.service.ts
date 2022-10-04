import { fetchSchema, getSchemasByType } from '@andromedaprotocol/andromeda.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchemaService {
  public async generateSchema(adoType: string): Promise<string> {
    const schemaUrls = getSchemasByType(adoType)
    const querySchema = await fetchSchema(schemaUrls.query)
    console.log(querySchema)
    //const tsSchemaObj = await compile(, adoType + 'Schema')
    return "NONE"
  }
}
