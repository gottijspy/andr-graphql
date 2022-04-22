import { Field, ObjectType } from '@nestjs/graphql'
import { BaseAdo } from 'src/ado-common/interfaces'
import { AndrModule } from 'src/ado-common/models'
import { AndrAddress } from 'src/ado-common/types'

/*
The NFT Collectible ADO is a smart contract to allow users to launch their own custom NFT projects. 
In addition to the standard CW721 messages, we have added some custom logic to further extend 
the utility and function of the contract.

It supports the use of all our Modules hat can be attached to the contract upon instantiation and 
modified to satisfy the project needs. The Offers Module is specifically created to work with this 
contract to facilitate the process of buying/selling the tokens.

In addition to the offers module, the contract has implemented a custom TransferAgreement message 
to allow the buying/selling of tokens between two parties if the Offers module is not to be used.
*/

//ToDo: Token ID is not available, minter(AndrAddress) identifier?

@ObjectType({
  implements: () => [BaseAdo],
})
export class NftCollectibleAdo implements BaseAdo {
  @Field()
  adoId!: string

  @Field()
  adoType!: string

  // @Field()
  // readonly adoType = AdoType.Crowdfund

  @Field()
  name!: string

  @Field()
  symbol!: string

  @Field(() => AndrAddress)
  minter!: Promise<AndrAddress>

  @Field(() => [AndrModule], { nullable: true })
  modules?: Promise<AndrModule[]>
}
