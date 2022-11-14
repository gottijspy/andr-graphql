import { TIMELOCK_QUERY_OWNER, TIMELOCK_QUERY_RECIPIENT } from './timelock.constants'

export const TimelockSchema = {
  locked_funds: {
    get_locked_funds: {
      owner: TIMELOCK_QUERY_OWNER,
      recipient: TIMELOCK_QUERY_RECIPIENT,
    },
  },
}
