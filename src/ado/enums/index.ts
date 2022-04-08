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

export enum AndrModuleType {
  Rates = 'rates',
  Offers = 'offers',
  AddressList = 'address_list',
  Receipt = 'receipt',
}

export enum AndrRecipientType {
  Addr = 'Addr',
  ADO = 'ADO',
}

export enum AndrRateType {
  Flat = 'Coin',
  Percent = 'PercentRate',
  External = 'ADORate',
}

export function registerAdoEnums() {
  registerEnumType(AdoType, {
    name: 'AdoType',
  })

  registerEnumType(AndrModuleType, {
    name: 'AndrModuleType',
  })

  registerEnumType(AndrRecipientType, {
    name: 'AndrRecipientType',
  })

  registerEnumType(AndrRateType, {
    name: 'AndrRateType',
  })
}
