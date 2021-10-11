import { Entity, PrimaryColumn, CreateDateColumn, Column, Index } from 'typeorm'
import { ContractType } from 'types'
import { HaveFactoryAndMaybeToken } from './HaveFactoryAndMaybeToken'

@Entity('contract')
export class ContractEntity extends HaveFactoryAndMaybeToken {
  constructor(options: Partial<ContractEntity>) {
    super()
    Object.assign(this, options)
  }
  @PrimaryColumn()
  address: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: 'enum', enum: ContractType })
  @Index()
  type: ContractType
}
