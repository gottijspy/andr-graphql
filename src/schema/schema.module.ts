import { Module } from '@nestjs/common'
import { SchemaResolver } from './schema.resolver'
import { SchemaService } from './schema.service'

@Module({
  providers: [SchemaResolver, SchemaService],
})
export class SchemaModule {}
