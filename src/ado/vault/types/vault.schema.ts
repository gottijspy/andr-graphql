import { VAULT_QUERY_ADDRESS, VAULT_QUERY_STRATEGY } from './vault.constants'

export const VaultSchema = {
  balance: {
    balance: {
      address: VAULT_QUERY_ADDRESS,
    },
  },
  strategy_address: {
    strategy_address: {
      strategy: VAULT_QUERY_STRATEGY,
    },
  },
}
