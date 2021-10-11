import {
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column
  } from 'typeorm'
import { HaveFactory } from './HaveFactory'

@Entity('token')
export class TokenEntity extends HaveFactory {
  constructor(options: Partial<TokenEntity>) {
    super()
    Object.assign(this, options)
  }

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @PrimaryColumn()
  token: string // token address

  @Column()
  symbol: string

  @Column()
  name: string

  @Column()
  minter: string
}
