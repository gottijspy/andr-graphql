import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm'

@Entity('factory')
export class FactoryEntity {
    constructor(options: Partial<FactoryEntity>) {
      Object.assign(this, options)
    }
    @PrimaryGeneratedColumn()
    id: number
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @Column()
    chainId: string
    @Column()
    factory: string // factory contract address
  }
