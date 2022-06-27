import { Logger as NestLogger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
//import { NestExpressApplication } from '@nestjs/platform-express'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  //const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true })
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const configService = app.get(ConfigService)
  const port = parseInt(configService.get<string>('PORT', ''), 10)
  const host = configService.get<string>('HOST', '0.0.0.0')
  const env = configService.get<string>('NODE_ENV', 'dev')
  const playground = configService.get<string>('GRAPHQL_PLAYGROUND', 'false') === 'true'
  const helmetOptions = {
    frameguard: false,
    dnsPrefetchControl: {
      allow: true,
    },
    contentSecurityPolicy: env === 'production' && !playground ? undefined : false,
  }

  app.useLogger(app.get(Logger))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  )
  app.use([compression(), helmet(helmetOptions), hpp()])

  await app.listen(process.env.PORT || port, host)

  NestLogger.log(`App listening on port http://${host}:${port}/`)
}

bootstrap()
