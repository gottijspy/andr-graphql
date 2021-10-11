import {
    Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn
  } from 'typeorm'

  @Entity('block')
  export class BlockEntity {
    constructor(options: Partial<BlockEntity>) {
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
    height: number
  }