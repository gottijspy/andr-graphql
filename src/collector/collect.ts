import * as bluebird from 'bluebird'
import { getManager, EntityManager } from 'typeorm'
import { getLatestBlockHeight, getTxs } from 'lib/terra'
import { errorHandler } from 'lib/error'
import { getCollectedBlock, updateBlock } from './block'
import { BlockEntity } from 'orm'
import { parseTxs } from './parser'
import config from 'config'

export async function collect(now: number): Promise<void> {
    let latestHeight = await getLatestBlockHeight().catch(async (error) => {
        errorHandler(error)
        await bluebird.delay(5000)
    })
    const collectedBlock = await getCollectedBlock().catch(errorHandler)

    if (!latestHeight || !collectedBlock || collectedBlock.height >= latestHeight) {
        return
    }
    // const collectedHeight = config.START_BLOCK_HEIGHT -1;
    const collectedHeight = collectedBlock.height

    console.log("BlockNumber:"+ (collectedHeight + 1));

    const txs = await getTxs(collectedHeight + 1, collectedHeight + 1).catch(errorHandler)
    if (!txs || txs.length < 1) {
        await bluebird.delay(500)
        return
    }

    const lastTx = txs[txs.length - 1]
    await getManager().transaction(async (manager: EntityManager) => {
        await parseTxs(manager, txs)
        await updateBlock(collectedBlock, lastTx.height, manager.getRepository(BlockEntity))
    })


}
