import {config as dotenv_config} from 'dotenv'
dotenv_config()

const {
    TERRA_MANTLE,
    TERRA_CHAIN_ID,
    CONTRACT_ID,
    SERVER_PORT,
} = process.env

export function validateConfig(): void {
    const keys = ['TERRA_MANTLE', 'TERRA_CHAIN_ID']
    for (const key of keys) {
        if (!process.env[key]) {
        throw new Error(`process.env.${key} is missing`)
        }
    }
}

const config = {
    TERRA_MANTLE,
    TERRA_CHAIN_ID,
    CONTRACT_ID: CONTRACT_ID ? +CONTRACT_ID : -1,
    START_BLOCK_HEIGHT: +process.env.START_BLOCK_HEIGHT || 0,
    PORT: SERVER_PORT ? +SERVER_PORT : 3858,
}

export default config