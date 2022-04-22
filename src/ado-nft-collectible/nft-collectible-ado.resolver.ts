import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrSearchOptions } from 'src/ado-common/models'
import { NftCollectibleAdoService } from './nft-collectible-ado.service'
import { AllNftInfo, NftQuery, NftApproval, NftContractInfo, NftInfo, NftOwnerInfo } from './types'

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
  public async approvedForAll(
    @Parent() nft: NftQuery,
    @Args('owner') owner: string,
    @Args('includeExpired') includeExpired: boolean,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    return this.nftCollectibleAdoService.approvedForAll(nft.contractAddress, owner, includeExpired, options)
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

  @ResolveField(() => [String])
  public async tokens(
    @Parent() nft: NftQuery,
    @Args('owner') owner: string,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return this.nftCollectibleAdoService.tokens(nft.contractAddress, owner, options)
  }

  // @ResolveField(() => [String])
  // public async tokens(
  //   @Args('owner') owner: string,
  //   @Args('options', { nullable: true }) options: AndrSearchOptions,
  // ): Promise<string[]> {
  //   return [] as string[]
  // }

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
