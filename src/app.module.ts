import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
// import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { join } from 'path'
import pino from 'pino'
import { AdoPackageModule } from './ado-package/ado-package.module'
import { AddresslistModule } from './ado/addresslist/addresslist.module'
import { AdoModule } from './ado/ado.module'
import { CrowdfundModule } from './ado/crowdfund/crowdfund.module'
import { CW20Module } from './ado/cw20/cw20.module'
import { FactoryModule } from './ado/factory/factory.module'
import { PrimitiveModule } from './ado/primitive/primitive.module'
import { RatesModule } from './ado/rates/rates.module'
import { SplitterModule } from './ado/splitter/splitter.module'
import { TimelockModule } from './ado/timelock/timelock.module'
import { registerEnums } from './ado/types/ado.enums'
import { VaultModule } from './ado/vault/vault.module'
import { AppResolver } from './app.resolver'
import { AppAdoModule } from './app/app-ado.module'
import { AssetsModule } from './assets/assets.module'
import { AuctionModule } from './auction/auction.module'
import { ChainConfigModule } from './chain-config/chain-config.module'
import { CosmModule } from './cosm'
import { CW721Module } from './cw721/cw721.module'
import { validate } from './env.validation'
import { SchemaModule } from './schema/schema.module'
import { TxModule } from './tx/tx.module'
import { WasmModule } from './wasm/wasm.module'
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, validate }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const pinoHttp: pino.LoggerOptions = {
          name: config.get<string>('LOG_NAME'),
          level: config.get<string>('LOG_LEVEL'),
          prettyPrint: false,
        }

        if (config.get<string>('NODE_ENV') !== 'production') {
          pinoHttp.prettyPrint = {
            colorize: true,
            singleLine: true,
            translateTime: true,
          }
        }

        return { pinoHttp }
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    // ThrottlerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     ttl: parseInt(config.get<string>('THROTTLE_TTL', '60'), 10),
    //     limit: parseInt(config.get<string>('THROTTLE_LIMIT', '20'), 10),
    //   }),
    // }),
    // Persisted queries are enabled and are using an unbounded cache.
    // Your server is vulnerable to denial of service attacks via memory exhaustion.
    // Set `cache: "bounded"` or `persistedQueries: false` in your ApolloServer constructor, or
    // see https://go.apollo.dev/s/cache-backends for other alternatives.
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        registerEnums() // register enums graphql

        return {
          sortSchema: config.get<string>('GRAPHQL_SORT_SCHEMA', 'true') === 'true',
          debug: config.get<string>('GRAPHQL_DEBUG', 'false') === 'true',
          playground: config.get<string>('GRAPHQL_PLAYGROUND', 'false') === 'true',
          autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
          introspection: config.get<string>('GRAPHQL_INTROSPECTION', 'true') === 'true',
        }
      },
    }),
    CosmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const RPC_URL = config.get<string>('RPC_URL')
        if (!RPC_URL) {
          throw new Error('Invalid RPC_URL variable.')
        }

        return {
          RPC_URL,
        }
      },
    }),
    AddresslistModule,
    AdoModule,
    AppAdoModule,
    AuctionModule,
    CrowdfundModule,
    CW20Module,
    FactoryModule,
    CW721Module,
    PrimitiveModule,
    RatesModule,
    SplitterModule,
    TimelockModule,
    VaultModule,
    TxModule,
    WasmModule,
    AssetsModule,
    SchemaModule,
    ChainConfigModule,
    AdoPackageModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
