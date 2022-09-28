import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApolloError, UserInputError } from 'apollo-server'
import { Model } from 'mongoose'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { DEFAULT_CATCH_ERR, MONGO_QUERY_ERROR } from 'src/ado/types/ado.constants'
import { AdoType } from 'src/ado/types/ado.enums'
import { Ado } from 'src/ado/types/ado.schema'
import { AppService } from 'src/app/app.service'
import { AppComponent } from 'src/app/types'
import { TxService } from 'src/tx/tx.service'
import { AssetResult } from './types'

@Injectable()
export class AssetsService {
  constructor(
    @InjectPinoLogger(AssetsService.name)
    protected readonly logger: PinoLogger,
    @Inject(TxService)
    protected readonly txService: TxService,
    @Inject(AppService)
    protected readonly appService: AppService,
    @InjectModel(Ado.name)
    private adoModel?: Model<Ado>,
  ) {}

  // public async getAssets(walletAddress: string): Promise<AssetResult[]> {
  //   const txList = await this.txService.byOwner(walletAddress)
  //   const assets = txList.map((tx) => this.getAsset(tx))
  //   return assets.filter((a) => a != null) as AssetResult[]
  // }

  // public async getTimestamp(height: number): Promise<string | undefined> {
  //   const blockInfo = await this.txService.getBlockInfo(height)

  //   if (!blockInfo) return
  //   return blockInfo.header?.time
  // }

  // private getAsset(tx: TxInfo): AssetResult | null {
  //   const instantiate = tx.txLog?.find((log) => log.events.map((ev) => ev.type).includes('instantiate'))

  //   if (!instantiate) return null

  //   const wasmEvent = instantiate.events.find((ev) => ev.type === 'wasm')
  //   if (!wasmEvent) return null

  //   const type = wasmEvent.attributes.find((attr) => attr.key === 'type')
  //   if (!type) return null

  //   const asset = { adoType: type.value, height: tx.height } as AssetResult

  //   const contractAddress = wasmEvent.attributes.find((attr) => attr.key === '_contract_address')
  //   if (contractAddress) {
  //     asset.contractAddress = contractAddress.value
  //   }

  //   return asset
  // }

  public async getAssets(owner: string, limit: number, offset: number, adoType?: AdoType): Promise<AssetResult[]> {
    try {
      const query: any = { owner: owner }
      if (adoType) {
        query.adoType = adoType
      }

      const ados = await this.adoModel?.find(query).limit(limit).skip(offset)
      if (!ados || !ados.length) return []

      return ados
    } catch (err: any) {
      this.logger.error({ err }, DEFAULT_CATCH_ERR, owner)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(MONGO_QUERY_ERROR, owner)
    }
  }

  public async getComponents(address: string, chainId?: string, adoType?: AdoType): Promise<AppComponent[]> {
    console.log({ chainId: chainId, address: address })
    const [components, addresses] = await Promise.all([
      this.appService.getComponents(address, chainId),
      this.appService.getAddresses(address, chainId),
    ])

    const compswithAddr = components.map((item) => {
      const componentAddress = addresses.find((addr) => addr.name == item.name)
      if (componentAddress) item.address = componentAddress.address
      return item
    })

    if (adoType) {
      return compswithAddr.filter((item) => item.ado_type === adoType)
    }

    return compswithAddr
  }

  // public async getTokens(address: string, adoType: AdoType, attributes?: SearchAttribute[]): Promise<NftInfo[]> {
  //   if (adoType === AdoType.App) {
  //     const cw721Components = await this.getComponents(address, AdoType.CW721)
  //     const tokens =  await Promise.all(
  //       cw721Components.map(async (item) => {
  //         return this.cw721Service.searchTokens(item.address, attributes)
  //       }),
  //     )

  //     return tokens
  //   }

  //   if (adoType === AdoType.CW721) {
  //     return this.cw721Service.searchTokens(address, attributes)
  //   }

  //   return []
  // }
}
