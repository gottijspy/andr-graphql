import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AssetResult {
  @Field({ nullable: true })
  adoType?: string

  @Field({ nullable: true })
  contractAddress?: string

  @Field(() => Int, { nullable: true })
  height?: number

  @Field({ nullable: true })
  timestamp?: string

  // @Field(() => AssetInfoResult, { nullable: true })
  // assetInfo?: AdoAppContract | AdoContract
}

// export const AssetInfoResult = createUnionType({
//   name: 'AssetInfoResult',
//   types: () => [AdoAppContract, AdoContract] as const,
//   resolveType: (asset) => {
//     if (asset.adoType === AdoType[AdoType.App].toLowerCase()) {
//       return AdoAppContract
//     }

//     return AdoContract
//   },
// })
