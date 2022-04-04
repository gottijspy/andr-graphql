import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    Index,
    JoinColumn,
    ManyToOne,
    Entity
  } from 'typeorm'
  import { ContractEntity } from './ContractEntity'
  import { HaveFactoryAndMaybeToken } from './HaveFactoryAndMaybeToken'

  @Entity('tx')
  export class TxEntity extends HaveFactoryAndMaybeToken {
    constructor(options: Partial<TxEntity>) {
      super()
      Object.assign(this, options)
    }

    @CreateDateColumn()
    createdAt: Date

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    height: number

    @Column()
    txHash: string

    @Column()
    token_id: string

    @Column({ nullable: true })
    operator?: string

    @Column({ nullable: true })
    sender?: string

    @Column({ nullable: true })
    purchaser?: string

    @Column({ nullable: true })
    spender?: string

    @Column({ nullable: true })
    recipient?: string

    @Column({ nullable: true })
    amount?: string

    @Column()
    operate: string

    @Column()
    @Index()
    datetime: Date
}
