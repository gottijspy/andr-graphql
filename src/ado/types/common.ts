import { Field, ObjectType } from '@nestjs/graphql'
import { AdoType } from '../andr-query/types'

export class TypeMismatchError {
  constructor(expectedType: AdoType, observedType: AdoType) {
    this.code = 1
    this.errorType = 'TYPE_MISMATCH'
    this.error = `TypeError: expecting ${expectedType} contract, found: ${observedType}`
  }

  code?: number
  errorType!: string
  error!: string
}

@ObjectType()
export class Coin {
  @Field()
  denom!: string

  @Field()
  amount!: string
}
