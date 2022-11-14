import { CROWDFUND_QUERY_TOKEN_ID } from './crowdfund.constants'

export const CrowdfundSchema = {
  state: {
    state: {},
  },
  config: {
    config: {},
  },
  available_tokens: {
    available_tokens: {},
  },
  is_token_available: {
    is_token_available: {
      id: CROWDFUND_QUERY_TOKEN_ID,
    },
  },
}
