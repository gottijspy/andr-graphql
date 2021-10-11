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
    @Index()
    token_id: string

    @Column()
    sender: string

    @Column()
    recipient: string

    @Column()
    @Index()
    datetime: Date

    @ManyToOne((type) => ContractEntity, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'contract_id' })
    contract?: ContractEntity

    @Column({ nullable: true })
    contractId?: number
}
