import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Intervention from '#models/intervention'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @manyToMany(() => Intervention, {
    pivotTable: 'intervention_product',
  })
  declare interventions: ManyToMany<typeof Intervention>
}
