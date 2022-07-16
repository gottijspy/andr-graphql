import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AllNftInfo, NftApproval, NftContractInfo, NftInfo, NftOwnerInfo, TransferAgreement } from 'src/ado/types'
import { NftContract, NftContractResult, AdoContractError, TypeMismatchError } from 'src/ado/types'
import { AdoType } from 'src/ado/types/ado.enums'
import { AndrSearchOptions } from '../types/andr-search-options.input'
import { NftService } from './nft.service'

@Resolver(NftContract)
export class NftResolver {
  constructor(private readonly nftService: NftService) {}

  @Query(() => NftContractResult)
  public async nft(@Args('address') address: string): Promise<typeof NftContractResult> {
    const contractInfo = await this.nftService.getContract(address)
    if ('error' in contractInfo) {
      return contractInfo
    }

    if (contractInfo.adoType && contractInfo.adoType == AdoType.NFT) {
      return contractInfo as NftContract
    }

    const typeError = new TypeMismatchError(AdoType.NFT, contractInfo.adoType)
    return { ...typeError } as AdoContractError
  }

  @ResolveField(() => String)
  public async owner(@Parent() nft: NftContract): Promise<string> {
    return this.nftService.owner(nft.address)
  }

  @ResolveField(() => [String])
  public async operators(@Parent() nft: NftContract): Promise<string[]> {
    return this.nftService.operators(nft.address)
  }

  @ResolveField(() => Boolean)
  public async isOperator(@Parent() nft: NftContract, @Args('operator') operator: string): Promise<boolean> {
    return this.nftService.isOperator(nft.address, operator)
  }

  //FIX: unknown variant minter
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `minter`
  @ResolveField(() => String)
  public async minter(@Parent() nft: NftContract): Promise<string> {
    return this.nftService.minter(nft.address)
  }

  @ResolveField(() => NftOwnerInfo)
  public async ownerOf(
    @Parent() nft: NftContract,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftOwnerInfo> {
    return this.nftService.ownerOf(nft.address, tokenId, includeExpired)
  }

  @ResolveField(() => [NftApproval])
  public async allOperators(
    @Parent() nft: NftContract,
    @Args('owner') owner: string,
    @Args('includeExpired') includeExpired: boolean,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    return this.nftService.allOperators(nft.address, owner, includeExpired, options)
  }

  //FIX: unknown variant approval
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `approval`
  @ResolveField(() => NftApproval)
  public async approval(
    @Parent() nft: NftContract,
    @Args('tokenId') tokenId: string,
    @Args('spender') spender: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftApproval> {
    return this.nftService.approval(nft.address, tokenId, spender, includeExpired)
  }

  //FIX: unknown variant approvals
  //Query failed with (18): Error parsing into type
  //  andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `approvals`
  @ResolveField(() => [NftApproval])
  public async approvals(
    @Parent() nft: NftContract,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftApproval[]> {
    return this.nftService.approvals(nft.address, tokenId, includeExpired)
  }

  @ResolveField(() => Int)
  public async numTokens(@Parent() nft: NftContract): Promise<number> {
    return this.nftService.numTokens(nft.address)
  }

  @ResolveField(() => NftInfo)
  public async nftInfo(@Parent() nft: NftContract, @Args('tokenId') tokenId: string): Promise<NftInfo> {
    return this.nftService.nftInfo(nft.address, tokenId)
  }

  @ResolveField(() => AllNftInfo)
  public async allNftInfo(
    @Parent() nft: NftContract,
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<AllNftInfo> {
    return this.nftService.allNftInfo(nft.address, tokenId, includeExpired)
  }

  //FIX: unknown variant
  //Query failed with (18): Error parsing into type
  // andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `is_archived`
  @ResolveField(() => Boolean)
  public async isArchived(@Parent() nft: NftContract, @Args('tokenId') tokenId: string): Promise<boolean> {
    return this.nftService.isArchived(nft.address, tokenId)
  }

  //FIX: unknown variant
  //Query failed with (18): Error parsing into type
  // andromeda_non_fungible_tokens::cw721::QueryMsg: unknown variant `transfer_agreeement`
  @ResolveField(() => TransferAgreement)
  public async transferAgreement(
    @Parent() nft: NftContract,
    @Args('tokenId') tokenId: string,
  ): Promise<TransferAgreement> {
    return this.nftService.transferAgreement(nft.address, tokenId)
  }

  @ResolveField(() => [String])
  public async tokens(
    @Parent() nft: NftContract,
    @Args('owner') owner: string,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.nftService.tokens(nft.address, owner, options)
  }

  @ResolveField(() => [String])
  public async allTokens(
    @Parent() nft: NftContract,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.nftService.allTokens(nft.address, options)
  }

  //Missing @Args: Open-endded query?
  @ResolveField(() => NftContractInfo)
  public async contractInfo(@Parent() nft: NftContract): Promise<NftContractInfo> {
    return this.nftService.contractInfo(nft.address)
  }
}
