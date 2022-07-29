import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
// import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { join } from 'path'
import pino from 'pino'
import { AddresslistModule } from './ado/addresslist/addresslist.module'
import { AdoModule } from './ado/ado.module'
import { AdoAppModule } from './ado/adoapp/adoapp.module'
import { AnchorModule } from './ado/anchor/anchor.module'
import { AuctionModule } from './ado/auction/auction.module'
import { CrowdfundModule } from './ado/crowdfund/crowdfund.module'
import { CW20TokenModule } from './ado/cw20-token/cw20-token.module'
import { FactoryModule } from './ado/factory/factory.module'
import { NftModule } from './ado/nft/nft.module'
import { AdoOffersModule } from './ado/offers/offers.module'
import { PrimitiveModule } from './ado/primitive/primitive.module'
import { RatesModule } from './ado/rates/rates.module'
import { SplitterModule } from './ado/splitter/splitter.module'
import { TimelockModule } from './ado/timelock/timelock.module'
import { registerEnums } from './ado/types/ado.enums'
import { VaultModule } from './ado/vault/vault.module'
import { AppResolver } from './app.resolver'
import { AssetsModule } from './assets/assets.module'
import { CosmModule } from './cosm'
import { validate } from './env.validation'
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
    //     ThrottlerModule.forRootAsync({
    //       imports: [ConfigModule],
    //       inject: [ConfigService],
    //       useFactory: (config: ConfigService) => ({
    //         ttl: parseInt(config.get<string>('THROTTLE_TTL', '60'), 10),
    //         limit: parseInt(config.get<string>('THROTTLE_LIMIT', '20'), 10),
    //       }),
    //     }),
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
    AdoOffersModule,
    AnchorModule,
    AdoAppModule,
    AuctionModule,
    CrowdfundModule,
    CW20TokenModule,
    FactoryModule,
    NftModule,
    PrimitiveModule,
    RatesModule,
    SplitterModule,
    TimelockModule,
    VaultModule,
    TxModule,
    WasmModule,
    AssetsModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
