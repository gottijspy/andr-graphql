import { NFT_QUERY_INCLUDE_EXPIRED, NFT_QUERY_OWNER, NFT_QUERY_SPENDER, NFT_QUERY_TOKEN_ID } from './cw721.constants'

export const CW721Schema = {
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
}
