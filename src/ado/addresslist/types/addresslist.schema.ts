import { ADDRESSLIST_QUERY_ADDRESS } from './addresslist.constants'

export const AddressListSchema = {
  includes_address: {
    includes_address: {
      address: ADDRESSLIST_QUERY_ADDRESS,
    },
  },
}
