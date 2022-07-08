import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrSearchOptions } from 'src/ado/common/models'
import { NftCollectibleAdoService } from './nft.service'
import { AllNftInfo, NftQuery, NftApproval, NftContractInfo, NftInfo, NftOwnerInfo, TransferAgreement } from './types'

//  expected one of
// `andr_query`, `andr_hook`, `owner_of`, `all_operators`, `num_tokens`,
// `nft_info`, `all_nft_info`, `tokens`, `all_tokens`, `module_info`, `contract_info`
@Resolver(NftQuery)
export class NftCollectibleAdoResolver {
  constructor(private readonly nftCollectibleAdoService: NftCollectibleAdoService) {}

  @Query(() => NftQuery)
  public async nft(@Args('contractAddress') contractAddress: string): Promise<NftQuery> {
    return { contractAddress: contractAddress } as NftQuery
  }

  @ResolveField(() => String)
  public async owner(@Parent() nft: NftQuery): Promise<string> {
    return this.nftCollectibleAdoService.owner(nft.contractAddress)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() nft: NftQuery): Promise<string[]> {
    return this.nftCollectibleAdoService.operators(nft.contractAddress)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() nft: NftQuery, @Args('operatorAddress') operatorAddress: string): Promise<boolean> {
    return this.nftCollectibleAdoService.isOperator(nft.contractAddress, operatorAddress)
  }

  //FIX: unknown variant minter
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `minter`
  @ResolveField(() => String)
  public async minter(@Parent() nft: NftQuery): Promise<string> {
    return this.nftCollectibleAdoService.minter(nft.contractAddress)
  }

  @ResolveField(() => NftOwnerInfo)
  public async ownerOf(
    @Parent() nft: NftQuery,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftOwnerInfo> {
    return this.nftCollectibleAdoService.ownerOf(nft.contractAddress, tokenId, includeExpired)
  }

  @ResolveField(() => [NftApproval])
  public async allOperators(
    @Parent() nft: NftQuery,
    @Args('owner') owner: string,
    @Args('includeExpired') includeExpired: boolean,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    return this.nftCollectibleAdoService.allOperators(nft.contractAddress, owner, includeExpired, options)
  }

  //FIX: unknown variant approval
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `approval`
  @ResolveField(() => NftApproval)
  public async approval(
    @Parent() nft: NftQuery,
    @Args('tokenId') tokenId: string,
    @Args('spender') spender: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftApproval> {
    return this.nftCollectibleAdoService.approval(nft.contractAddress, tokenId, spender, includeExpired)
  }

  //FIX: unknown variant approvals
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `approvals`
  @ResolveField(() => [NftApproval])
  public async approvals(
    @Parent() nft: NftQuery,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftApproval[]> {
    return this.nftCollectibleAdoService.approvals(nft.contractAddress, tokenId, includeExpired)
  }

  @ResolveField(() => Int)
  public async numTokens(@Parent() nft: NftQuery): Promise<number> {
    return this.nftCollectibleAdoService.numTokens(nft.contractAddress)
  }

  @ResolveField(() => NftInfo)
  public async nftInfo(@Parent() nft: NftQuery, @Args('tokenId') tokenId: string): Promise<NftInfo> {
    return this.nftCollectibleAdoService.nftInfo(nft.contractAddress, tokenId)
  }

  @ResolveField(() => AllNftInfo)
  public async allNftInfo(
    @Parent() nft: NftQuery,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<AllNftInfo> {
    return this.nftCollectibleAdoService.allNftInfo(nft.contractAddress, tokenId, includeExpired)
  }

  //FIX: unknown variant
  //Query failed with (18): Error parsing into type
  // andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `is_archived`
  @ResolveField(() => Boolean)
  public async isArchived(@Parent() nft: NftQuery, @Args('tokenId') tokenId: string): Promise<boolean> {
    return this.nftCollectibleAdoService.isArchived(nft.contractAddress, tokenId)
  }

  //FIX: unknown variant
  //Query failed with (18): Error parsing into type
  // andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `transfer_agreeement`
  @ResolveField(() => TransferAgreement)
  public async transferAgreement(
    @Parent() nft: NftQuery,
    @Args('tokenId') tokenId: string,
  ): Promise<TransferAgreement> {
    return this.nftCollectibleAdoService.transferAgreement(nft.contractAddress, tokenId)
  }

  @ResolveField(() => [String])
  public async tokens(
    @Parent() nft: NftQuery,
    @Args('owner') owner: string,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.nftCollectibleAdoService.tokens(nft.contractAddress, owner, options)
  }

  @ResolveField(() => [String])
  public async allTokens(
    @Parent() nft: NftQuery,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.nftCollectibleAdoService.allTokens(nft.contractAddress, options)
  }

  //Missing @Args: Open-endded query?
  @ResolveField(() => NftContractInfo)
  public async contractInfo(@Parent() nft: NftQuery): Promise<NftContractInfo> {
    return this.nftCollectibleAdoService.contractInfo(nft.contractAddress)
  }
}
