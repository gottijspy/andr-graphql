import * as sentry from '@sentry/node'
import * as logger from 'lib/logger'

export function errorHandler(error?: Error): void {
    if (error) {
        logger.error(error)
        sentry.captureException(error)
    }
}

export * from './api'