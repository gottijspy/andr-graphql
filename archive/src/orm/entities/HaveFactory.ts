
import { Column, JoinColumn, ManyToOne } from 'typeorm'
import { FactoryEntity } from './FactoryEntity'

export class HaveFactory {
    @ManyToOne((type) => FactoryEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'factory_id' })
    factory: FactoryEntity

    @Column()
    factoryId: number
}