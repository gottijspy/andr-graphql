import { TxInfo, Msg } from '@terra-money/terra.js'
import { GraphQLClient, gql } from 'graphql-request'
import { toSnakeCase, toCamelCase } from 'lib/caseStyles'
import { pick } from 'lodash'

export let mantle: GraphQLClient

export function initMantle(URL: string): GraphQLClient {
    mantle = new GraphQLClient(URL, {
      timeout: 60000,
      keepalive: true,
    })
    return mantle
}

export async function getLatestBlockHeight(): Promise<number> {
    const result = await mantle.request(
        gql`query {
        LastSyncedHeight
        }`
    )
    return result?.LastSyncedHeight
}

export async function getTxs(start: number, end: number, limit = 100): Promise<TxInfo[]> {
    const response = await mantle.request(
      gql`query($range: [Int!]!) {
        Blocks(Height_range: $range) {
          Txs {
            Height
            TxHash
            Success
            Code
            GasWanted
            GasUsed
            Timestamp
            TimestampUTC
            RawLog
            Logs {
              MsgIndex
              Log
              Events {
                Type
                Attributes {
                  Key
                  Value
                }
              }
            }
            Events {
              Type
              Attributes {
                Key
                Value
              }
            }
            Tx {
              Fee {
                Gas
                Amount {
                  Denom
                  Amount
                }
              }
              Msg {
                Type
                Value
              }
              Memo
              Signatures {
                PubKey {
                  Type
                  Value
                }
                Signature
              }
            }
          }
        }
      }`,
      {
        range: [start, end],
      }
    )
    const txs: TxInfo[] = []
    response?.Blocks?.map((Block) => {
      Block.Txs?.filter(rawTx => rawTx.Success).map((rawTx) => {
        const infos = toSnakeCase(pick(
          rawTx,
          ['Height', 'GasWanted', 'GasUsed', 'RawLog', 'Logs', 'Events']
        ))
        infos.timestamp = new Date((+rawTx.TimestampUTC) * 1000).toUTCString()
  
        const txValue = toSnakeCase(pick(rawTx.Tx, ['Fee', 'Signatures', 'Memo']))
        const tx = {
          type: 'core/StdTx',
          value: {
            ...txValue,
            msg: rawTx.Tx.Msg
              .filter((msg) => [
                'wasm/MsgExecuteContract',
                'bank/MsgSend',
                'bank/MsgMultiSend',
                'market/MsgSwap',
                'market/MsgSwapSend'
              ].includes(msg.Type))
              .map((msg) => {
                return Msg.fromData({ type: msg.Type, value: JSON.parse(msg.Value) } as Msg.Data)?.toData()
              })
              .filter(Boolean)
          }
        }

        txs.push(TxInfo.fromData({ ...infos, txhash: rawTx.TxHash, tx }))
      })
    })

    return txs
  }