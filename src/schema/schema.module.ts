import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { SchemaResolver } from './schema.resolver';

@Module({
  providers: [SchemaResolver, SchemaService]
})
export class SchemaModule {}
