import * as bluebird from 'bluebird'

import { initORM } from 'orm'
import { initAndromeda } from 'loaders'
import {validateConfig} from 'config'
import { collect } from './collect'
import * as logger from 'lib/logger'
import { errorHandler } from 'lib/error'
import config from 'config'


async function loop(): Promise<void> {
    for (;;) {
        const now = Date.now()

        await collect(now)

        await bluebird.delay(200)

    }
}

async function main(): Promise<void> {

    logger.info(`Initialize collector, start_block_height: ${config.START_BLOCK_HEIGHT}`)

    validateConfig()

    await initORM()

    logger.info('Initialize andromeda')
    await initAndromeda()

    logger.info('start collecting')

    await loop()

}

if (require.main === module) {
    main().catch((error) => {
        // error['message'] && sendSlack('mirror-collector', error['message'])
        errorHandler(error)
    })
}