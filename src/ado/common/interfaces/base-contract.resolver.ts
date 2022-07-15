// import { Resolver, ResolveField, Parent, Info, Args } from '@nestjs/graphql';
// import { BaseContract } from './base-query.interface';

// @Resolver(type => BaseContract)
// export class ContractInterfaceResolver {
//   @ResolveField(() => [BaseContract])
//   contract_info(
//     @Parent() contract: BaseContract, // Resolved object that implements Character
//     @Info() { parentType }, // Type of the object that implements Character
//     @Args('address', { type: () => String }) address: string,
//   ) {
//     // Get character's friends
//     return [];
//   }
// }
