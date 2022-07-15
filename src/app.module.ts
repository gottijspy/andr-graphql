import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
// import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { TerraModule } from 'nestjs-terra'
import { join } from 'path'
import pino from 'pino'
import { AddressListAdoModule } from './ado/address-list/address-list.module'
import { AdoModule } from './ado/ado.module'
import { AnchorAdoModule } from './ado/anchor/anchor.module'
import { AppAdoModule } from './ado/app/app.module'
import { AuctionAdoModule } from './ado/auction/auction.module'
import { CrowdfundAdoModule } from './ado/crowdfund/crowdfund.module'
import { CW20TokenAdoModule } from './ado/cw20-token/cw20-token.module'
import { NftCollectibleAdoModule } from './ado/nft/nft.module'
import { AdoOffersModule } from './ado/offers/offers.module'
import { PrimitiveAdoModule } from './ado/primitive/primitive.module'
import { RatesAdoModule } from './ado/rates/rates.module'
import { SplitterAdoModule } from './ado/splitter/splitter.module'
import { TimelockAdoModule } from './ado/timelock/timelock.module'
import { registerEnums } from './ado/types/ado.enums'
import { VaultAdoModule } from './ado/vault/vault.module'
import { AnythingScalar } from './anything.scalar'
import { AppResolver } from './app.resolver'
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
    TerraModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const URL = config.get<string>('RPC_URL')
        const chainID = config.get<string>('CHAIN_ID')

        if (!URL || !chainID) {
          throw new Error('Invalid RPC_URL or CHAIN_ID variables.')
        }

        return {
          URL,
          chainID,
        }
      },
    }),
    AddressListAdoModule,
    AdoModule,
    AdoOffersModule,
    AnchorAdoModule,
    AppAdoModule,
    AuctionAdoModule,
    CrowdfundAdoModule,
    CW20TokenAdoModule,
    NftCollectibleAdoModule,
    PrimitiveAdoModule,
    RatesAdoModule,
    SplitterAdoModule,
    TimelockAdoModule,
    VaultAdoModule,
    TxModule,
    WasmModule,
  ],
  providers: [AppResolver, AnythingScalar],
})
export class AppModule {}
