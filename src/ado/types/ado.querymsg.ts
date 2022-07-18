import {
  ANDR_QUERY_OPERATOR,
  APP_QUERY_COMPONENT_NAME,
  CROWDFUND_QUERY_TOKEN_ID,
  NFT_QUERY_INCLUDE_EXPIRED,
  NFT_QUERY_TOKEN_ID,
} from './ado.constants'

export const queryMsgs = {
  ado: {
    owner: {
      andr_query: {
        owner: {},
      },
    },
    operators: {
      andr_query: {
        operators: {},
      },
    },
    is_operator: {
      andr_query: {
        is_operator: {
          address: ANDR_QUERY_OPERATOR,
        },
      },
    },
  },
  adoapp: {
    config: {
      config: {},
    },
    get_addresses: {
      get_addresses: {},
    },
    get_address: {
      get_address: {
        name: APP_QUERY_COMPONENT_NAME,
      },
    },
    component_exists: {
      component_exists: {
        name: APP_QUERY_COMPONENT_NAME,
      },
    },
    get_components: {
      get_components: {},
    },
  },
  crowdfund: {
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
  },
  cw20token: {
    token_info: {
      token_info: {},
    },
  },
  nft: {
    minter: {
      minter: {},
    },
    owner_of: {
      owner_of: {
        token_id: NFT_QUERY_TOKEN_ID,
        include_expired: NFT_QUERY_INCLUDE_EXPIRED,
      },
    },
  },
}
