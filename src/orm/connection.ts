import { values } from 'lodash'
import * as logger from 'lib/logger'
import * as entities from './entities'
import * as CamelToSnakeNamingStrategy from './utils/namingStrategy'
import { Container } from 'typeorm-typedi-extensions'

import {
    Connection,
    createConnection,
    useContainer,
} from 'typeorm'

let connection:Connection = null

export async function initORM():Promise<Connection>{

    logger.info('Initialize ORM')
    const {
        TYPEORM_HOST, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE
    } = process.env

    useContainer(Container)

    connection = await createConnection({
        type: "postgres",
        host: TYPEORM_HOST,
        port: 5432,
        username: TYPEORM_USERNAME,
        password: TYPEORM_PASSWORD,
        database: TYPEORM_DATABASE,
        synchronize: true,
        entities: values(entities),
        namingStrategy: new CamelToSnakeNamingStrategy(),

    })

    return connection
}