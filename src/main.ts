import * as bluebird from 'bluebird'
import { errorHandler } from 'lib/error'
import * as logger from 'lib/logger'
import { validateConfig } from 'config'
import { initORM } from 'orm'
import { initServer, initAndromeda } from 'loaders'

bluebird.config({ longStackTraces: true, warnings: { wForgottenReturn: false } })
global.Promise = bluebird as any // eslint-disable-line

async function main(): Promise<void> {
    logger.info('Initialize andromeda-graph')

    validateConfig()

    await initORM()

    await initAndromeda()

    await initServer()

}
if (require.main === module) {
    main().catch(errorHandler)
}
