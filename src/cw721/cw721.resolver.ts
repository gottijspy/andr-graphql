import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server'
import { AdoType } from 'src/ado/types/ado.enums'
import { AdoResolver } from '../ado/ado.resolver'
import { TypeMismatchError } from '../ado/types'
import { AndrSearchOptions } from '../ado/types/andr-search-options.input'
import { CW721Service } from './cw721.service'
import {
  AllNftInfo,
  CW721Contract,
  NftApproval,
  NftContractInfo,
  NftInfo,
  NftOwnerInfo,
  TransferAgreement,
} from './types'
import { AttributeSearchOptions } from './types/cw721.contract'

@Resolver(CW721Contract)
export class CW721Resolver extends AdoResolver {
  constructor(private readonly cw721Service: CW721Service) {
    super(cw721Service)
  }

  @Query(() => CW721Contract)
  public async cw721(@Args('address') address: string): Promise<CW721Contract> {
    const contractInfo = await this.cw721Service.getContract(address)
    if (contractInfo.adoType && contractInfo.adoType == AdoType.CW721) {
      return contractInfo as CW721Contract
    }

    const typeError = new TypeMismatchError(AdoType.CW721, contractInfo.adoType)
    throw new UserInputError(typeError.error, { ...typeError })
  }

  //FIX: unknown variant minter
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `minter`
  @ResolveField(() => String)
  public async minter(@Parent() cw721: CW721Contract): Promise<string> {
    return this.cw721Service.minter(cw721.address)
  }

  @ResolveField(() => NftOwnerInfo)
  public async ownerOf(
    @Parent() cw721: CW721Contract,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftOwnerInfo> {
    return this.cw721Service.ownerOf(cw721.address, tokenId, includeExpired)
  }

  @ResolveField(() => [NftApproval])
  public async allOperators(
    @Parent() cw721: CW721Contract,
    @Args('owner') owner: string,
    @Args('includeExpired') includeExpired: boolean,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    return this.cw721Service.allOperators(cw721.address, owner, includeExpired, options)
  }

  //FIX: unknown variant approval
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `approval`
  @ResolveField(() => NftApproval)
  public async approval(
    @Parent() cw721: CW721Contract,
    @Args('tokenId') tokenId: string,
    @Args('spender') spender: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftApproval> {
    return this.cw721Service.approval(cw721.address, tokenId, spender, includeExpired)
  }

  //FIX: unknown variant approvals
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `approvals`
  @ResolveField(() => [NftApproval])
  public async approvals(
    @Parent() cw721: CW721Contract,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftApproval[]> {
    return this.cw721Service.approvals(cw721.address, tokenId, includeExpired)
  }

  @ResolveField(() => Int)
  public async numTokens(@Parent() cw721: CW721Contract): Promise<number> {
    return this.cw721Service.numTokens(cw721.address)
  }

  @ResolveField(() => NftInfo)
  public async nftInfo(@Parent() cw721: CW721Contract, @Args('tokenId') tokenId: string): Promise<NftInfo> {
    return this.cw721Service.nftInfo(cw721.address, tokenId)
  }

  @ResolveField(() => AllNftInfo)
  public async allNftInfo(
    @Parent() cw721: CW721Contract,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<AllNftInfo> {
    return this.cw721Service.allNftInfo(cw721.address, tokenId, includeExpired)
  }

  //FIX: unknown variant
  //Query failed with (18): Error parsing into type
  // andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `is_archived`
  @ResolveField(() => Boolean)
  public async isArchived(@Parent() cw721: CW721Contract, @Args('tokenId') tokenId: string): Promise<boolean> {
    return this.cw721Service.isArchived(cw721.address, tokenId)
  }

  //FIX: unknown variant
  //Query failed with (18): Error parsing into type
  // andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `transfer_agreeement`
  @ResolveField(() => TransferAgreement)
  public async transferAgreement(
    @Parent() cw721: CW721Contract,
    @Args('tokenId') tokenId: string,
  ): Promise<TransferAgreement> {
    return this.cw721Service.transferAgreement(cw721.address, tokenId)
  }

  @ResolveField(() => [String])
  public async tokens(
    @Parent() cw721: CW721Contract,
    @Args('owner') owner: string,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.cw721Service.tokens(cw721.address, owner, options)
  }

  @ResolveField(() => [String])
  public async allTokens(
    @Parent() cw721: CW721Contract,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.cw721Service.allTokens(cw721.address, options)
  }

  @ResolveField(() => [NftInfo])
  public async searchTokens(
    @Parent() cw721: CW721Contract,
    @Args() filters?: AttributeSearchOptions,
  ): Promise<NftInfo[]> {
    return this.cw721Service.searchTokens(cw721.address, filters?.attributes)
  }

  @ResolveField(() => NftContractInfo)
  public async contractInfo(@Parent() cw721: CW721Contract): Promise<NftContractInfo> {
    return this.cw721Service.contractInfo(cw721.address)
  }
}
