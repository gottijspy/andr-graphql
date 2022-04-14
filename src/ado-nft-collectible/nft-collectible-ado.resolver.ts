import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AndrSearchOptions } from 'src/ado-common/models'
import { AllNftInfo, NFT, NftApproval, NftContractInfo, NftInfo, NftOwnerInfo } from './models'
//import { NftCollectibleAdoService } from './nft-collectible-ado.service'

@Resolver(NFT)
export class NftCollectibleAdoResolver {
  //constructor(private readonly nftCollectibleAdoService: NftCollectibleAdoService) {}

  @Query(() => NFT)
  public async nft(): Promise<NFT> {
    return {} as NFT
  }

  @ResolveField(() => NftOwnerInfo)
  public async ownerOf(
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<NftOwnerInfo> {
    return {} as NftOwnerInfo
  }

  @ResolveField(() => [NftApproval])
  public async approvals(
    @Args('owner') owner: string,
    @Args('includeExpired') includeExpired: boolean,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<NftApproval[]> {
    return [] as NftApproval[]
  }

  @ResolveField(() => NftInfo)
  public async nftInfo(@Args('tokenId') tokenId: string): Promise<NftInfo> {
    return {} as NftInfo
  }

  @ResolveField(() => AllNftInfo)
  public async allNftInfo(
    @Args('tokenId') tokenId: string,
    @Args('includeExpired') includeExpired: boolean,
  ): Promise<AllNftInfo> {
    return {} as AllNftInfo
  }

  @ResolveField(() => [String])
  public async tokens(
    @Args('owner') owner: string,
    @Args('options', { nullable: true }) options: AndrSearchOptions,
  ): Promise<string[]> {
    return [] as string[]
  }

  @ResolveField(() => [String])
  public async allTokens(@Args('options', { nullable: true }) options: AndrSearchOptions): Promise<string[]> {
    return [] as string[]
  }

  //Missing @Args: Open-endded query?
  @ResolveField(() => NftContractInfo)
  public async contractInfo(): Promise<NftContractInfo> {
    return {} as NftContractInfo
  }

  //Missing @Args: Open-endded query?
  @ResolveField(() => String)
  public async minter(): Promise<string> {
    return ''
  }

  //Missing @Args: Open-endded query?
  @ResolveField(() => Int)
  public async numTokens(): Promise<number> {
    return 0
  }

  // @ResolveField(() => String)
  // public async primitiveContract(@Args('address') address: string): Promise<string> {
  //   return await this.tokenAdoService.primitiveContract(address);
  // }

  // @ResolveField(() => AdoSearchResult)
  // public async search(@Args('options') options: AdoSearchOptions): Promise<AdoSearchResult> {
  //   return this.adoService.search(options)
  // }
}
