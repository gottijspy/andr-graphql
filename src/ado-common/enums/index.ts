import { registerEnumType } from '@nestjs/graphql'

export enum AdoType {
  Token = 'Token',
  Timelock = 'Timelock',
  AddressList = 'Address List',
  Auction = 'Auction',
  Receipt = 'Receipt',
  AdoOffers = 'ADO Offers',
  Primitive = 'Primitive',
  Splitter = 'Splitter',
  Rates = 'Rates',
  Mission = 'Mission',
  Crowdfund = 'Crowdfund',
}

//ERR: TS enums vs Rust enums
export enum AndrExpirationType {
  AtHeight = 'AtHeight',
  AtTime = 'AtTime',
  Never = 'Never',
}

export enum AndrModuleType {
  Rates = 'rates',
  Offers = 'offers',
  AddressList = 'address_list',
  Receipt = 'receipt',
}

export enum AndrOrderBy {
  Asc = 'Asc',
  Desc = 'Desc',
}

export enum AndrRecipientType {
  Addr = 'Addr',
  ADO = 'ADO',
}

//ERR: TS enums vs Rust enums
export enum AndrRateType {
  Flat = 'Coin',
  Percent = 'PercentRate',
  External = 'ADORate',
}

export enum AndrStrategyType {
  Anchor = 'Anchor',
}

export function registerAdoEnums() {
  registerEnumType(AdoType, {
    name: 'AdoType',
  })

  registerEnumType(AndrExpirationType, {
    name: 'AndrExpirationType',
  })

  registerEnumType(AndrModuleType, {
    name: 'AndrModuleType',
  })

  registerEnumType(AndrOrderBy, {
    name: 'AndrOrderBy',
  })

  registerEnumType(AndrRecipientType, {
    name: 'AndrRecipientType',
  })

  registerEnumType(AndrRateType, {
    name: 'AndrRateType',
  })

  registerEnumType(AndrStrategyType, {
    name: 'AndrStrategyType',
  })
}
