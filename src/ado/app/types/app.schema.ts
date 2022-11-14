import { APP_QUERY_COMPONENT_NAME } from './app.constants'

export const AppSchema = {
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
}
