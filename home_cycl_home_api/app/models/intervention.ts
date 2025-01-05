import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class Intervention extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare started_at: DateTime

  @column()
  declare ended_at: DateTime

  @column()
  declare price: number

  @column()
  declare bike: string

  @column()
  declare service: string

  @column()
  declare tech_id: number

  @column()
  declare client_id: number

  @manyToMany(() => Product, {
    pivotTable: 'intervention_product',
  })
  declare products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
