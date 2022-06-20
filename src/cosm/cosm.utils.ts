import { DECORATED_PREFIX } from './cosm.constants'

export function getCosmToken(): string {
  return `${DECORATED_PREFIX}:CosmClient`
}
