import { Column, JoinColumn, ManyToOne, Index } from 'typeorm'
import { HaveFactory } from './HaveFactory'
import { TokenEntity } from './TokenEntity'

export class HaveFactoryAndMaybeToken extends HaveFactory {
  @ManyToOne((type) => TokenEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token' })
  asset?: TokenEntity

  @Column({ nullable: true })
  @Index()
  token?: string
}
