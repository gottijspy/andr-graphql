import * as logger from 'lib/logger'
import config from 'config'
import { initMantle } from 'lib/terra'
import { factoryService } from 'services'
import { loadContracts } from 'lib/data'

export async function initAndromeda(): Promise<void> {
    logger.info('Initialize mantle')
    initMantle(config.TERRA_MANTLE)

    const factory = await factoryService().load(config.CONTRACT_ID)
    if (!factory) {
        const contracts = loadContracts()

        logger.info('create andromeda factory from json files')

        await factoryService().create(contracts)

        if (!(await factoryService().load(-1))) {
          throw new Error('create andromeda factory failed')
        }
    }
}