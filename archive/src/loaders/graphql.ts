import { ApolloServer } from 'apollo-server-koa'
import * as TypeGraphQL from 'type-graphql'
import * as Koa from 'koa'
import { errorHandler } from 'lib/error'
import { Container } from 'typedi'
import * as path from 'path'


let server: ApolloServer

// eslint-disable-next-line
export const ErrorInterceptor: TypeGraphQL.MiddlewareFn<any> = async ({ context, info }, next) => {
    try {
      return await next()
    } catch (error) {
      errorHandler(error)
      throw error
    }
  }

export async function initGraphQL(app: Koa): Promise<void> {
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [path.dirname(require.main.filename) + '/graphql/resolvers/**/*.ts'],
      container: Container,
      globalMiddlewares: [ErrorInterceptor],
      validate: false,
    })

    server = new ApolloServer({
      schema,
      context: ({ req }) => req,
      debug: false,
      introspection: true,
    })
    await server.start()

    // server.applyMiddleware({ app, path: '/graphql' })
    server.applyMiddleware({ app, path: '/' })
  }