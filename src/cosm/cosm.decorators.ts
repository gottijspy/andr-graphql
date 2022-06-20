import { Inject } from '@nestjs/common'
import { getCosmToken } from './cosm.utils'

export const InjectCosmClient = () => Inject(getCosmToken())
