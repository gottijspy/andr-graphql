import {
  ADDRESSLIST_QUERY_ADDRESS,
  ANDR_QUERY_OPERATOR,
  APP_QUERY_COMPONENT_NAME,
  CROWDFUND_QUERY_TOKEN_ID,
  NFT_QUERY_INCLUDE_EXPIRED,
  NFT_QUERY_OWNER,
  NFT_QUERY_SPENDER,
  NFT_QUERY_TOKEN_ID,
  OFFERS_QUERY_PURCHASER,
  OFFERS_QUERY_TOKEN_ID,
  PRIMITIVE_QUERY_KEY,
  TIMELOCK_QUERY_OWNER,
  TIMELOCK_QUERY_RECIPIENT,
  VAULT_QUERY_ADDRESS,
  VAULT_QUERY_STRATEGY,
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
  addresslist: {
    includes_address: {
      includes_address: {
        address: ADDRESSLIST_QUERY_ADDRESS,
      },
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
    all_operators: {
      all_operators: {
        owner: NFT_QUERY_OWNER,
        include_expired: NFT_QUERY_INCLUDE_EXPIRED,
      },
    },
    approval: {
      approval: {
        token_id: NFT_QUERY_TOKEN_ID,
        spender: NFT_QUERY_SPENDER,
        include_expired: NFT_QUERY_INCLUDE_EXPIRED,
      },
    },
    approvals: {
      approval: {
        token_id: NFT_QUERY_TOKEN_ID,
        include_expired: NFT_QUERY_INCLUDE_EXPIRED,
      },
    },
    num_tokens: {
      num_tokens: {},
    },
    nft_info: {
      nft_info: {
        token_id: NFT_QUERY_TOKEN_ID,
      },
    },
    all_nft_info: {
      all_nft_info: {
        token_id: NFT_QUERY_TOKEN_ID,
        include_expired: NFT_QUERY_INCLUDE_EXPIRED,
      },
    },
    is_archived: {
      is_archived: {
        token_id: NFT_QUERY_TOKEN_ID,
      },
    },
    transfer_agreeement: {
      transfer_agreeement: {
        token_id: NFT_QUERY_TOKEN_ID,
      },
    },
    tokens: {
      tokens: {
        owner: NFT_QUERY_OWNER,
      },
    },
    all_tokens: {
      all_tokens: {},
    },
    contract_info: {
      contract_info: {},
    },
  },
  offers: {
    offer: {
      offer: {
        token_id: OFFERS_QUERY_TOKEN_ID,
      },
    },
    all_offers: {
      all_offers: {
        purchaser: OFFERS_QUERY_PURCHASER,
      },
    },
  },
  primitive: {
    get_value: {
      andr_query: {
        get: PRIMITIVE_QUERY_KEY,
      },
    },
  },
  rates: {
    payments: {
      payments: {},
    },
  },
  splitter: {
    config: {
      get_splitter_config: {},
    },
  },
  timelock: {
    locked_funds: {
      get_locked_funds: {
        owner: TIMELOCK_QUERY_OWNER,
        recipient: TIMELOCK_QUERY_RECIPIENT,
      },
    },
  },
  vault: {
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
  },
}
