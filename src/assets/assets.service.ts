import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApolloError, UserInputError } from 'apollo-server'
import { Model } from 'mongoose'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { DEFAULT_CATCH_ERR, MONGO_QUERY_ERROR } from 'src/ado/types/ado.constants'
import { Ado } from 'src/ado/types/ado.schema'
import { TxService } from 'src/tx/tx.service'
import { TxInfo } from 'src/tx/types/tx.result'
import { AssetResult } from './types/assets.result'

@Injectable()
export class AssetsService {
  constructor(
    @InjectPinoLogger(AssetsService.name)
    protected readonly logger: PinoLogger,
    @Inject(TxService)
    protected readonly txService: TxService,
    @InjectModel(Ado.name)
    private adoModel?: Model<Ado>,
  ) {}

  public async getAssets(walletAddress: string): Promise<AssetResult[]> {
    const txList = await this.txService.byOwner(walletAddress)
    const assets = txList.map((tx) => this.getAsset(tx))
    return assets.filter((a) => a != null) as AssetResult[]
  }

  public async getTimestamp(height: number): Promise<string | undefined> {
    const blockInfo = await this.txService.getBlockInfo(height)

    if (!blockInfo) return
    return blockInfo.header?.time
  }

  private getAsset(tx: TxInfo): AssetResult | null {
    const instantiate = tx.txLog?.find((log) => log.events.map((ev) => ev.type).includes('instantiate'))

    if (!instantiate) return null

    const wasmEvent = instantiate.events.find((ev) => ev.type === 'wasm')
    if (!wasmEvent) return null

    const type = wasmEvent.attributes.find((attr) => attr.key === 'type')
    if (!type) return null

    const asset = { adoType: type.value, height: tx.height } as AssetResult

    const contractAddress = wasmEvent.attributes.find((attr) => attr.key === '_contract_address')
    if (contractAddress) {
      asset.contractAddress = contractAddress.value
    }

    return asset
  }

  public async getIndexedAdos(owner: string, limit: number, offset: number): Promise<Ado[]> {
    try {
      const ados = await this.adoModel?.find({ owner: owner }).limit(limit).skip(offset)
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
}
