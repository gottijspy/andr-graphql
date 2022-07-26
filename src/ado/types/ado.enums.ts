import { registerEnumType } from '@nestjs/graphql'

export type Denom = string

export enum ProposalStatus {
  DepositPeriod = 'DepositPeriod',
  VotingPeriod = 'VotingPeriod',
  Passed = 'Passed',
  Rejected = 'Rejected',
  Failed = 'Failed',
}

export enum VoteOption {
  Empty = 'Empty',
  Yes = 'Yes',
  Abstain = 'Abstain',
  No = 'No',
  NoWithVeto = 'NoWithVeto',
}

export enum OrderBy {
  ORDER_BY_ASC = 1,
  ORDER_BY_DESC = 2,
}

export enum AdoType {
  Addresslist = 'addresslist',
  Ado = 'ado',
  Anchor = 'anchor',
  App = 'App',
  Auction = 'auction',
  Crowdfund = 'crowdfund',
  CW20Token = 'cw20token',
  NFT = 'nft',
  Offers = 'offers',
  Primitive = 'primitive',
  Rates = 'rates',
  Receipt = 'receipt',
  Splitter = 'splitter',
  Timelock = 'timelock',
  Vault = 'vault',
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

export function registerEnums() {
  registerEnumType(ProposalStatus, {
    name: 'ProposalStatus',
  })

  registerEnumType(VoteOption, {
    name: 'VoteOption',
  })

  registerEnumType(OrderBy, {
    name: 'OrderBy',
  })

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
