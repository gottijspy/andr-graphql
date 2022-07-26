import { Inject, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
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
  ) {}

  public async getAssets(walletAddress: string): Promise<AssetResult[]> {
    const txList = await this.txService.byOwner(walletAddress)
    const assets = txList.map((tx) => this.getAsset(tx))
    return assets.filter((a) => a != null) as AssetResult[]
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
}
