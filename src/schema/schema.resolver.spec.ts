import { Test, TestingModule } from '@nestjs/testing';
import { SchemaResolver } from './schema.resolver';
import { SchemaService } from './schema.service';

describe('SchemaResolver', () => {
  let resolver: SchemaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchemaResolver, SchemaService],
    }).compile();

    resolver = module.get<SchemaResolver>(SchemaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
