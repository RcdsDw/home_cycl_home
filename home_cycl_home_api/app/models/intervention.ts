import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
  declare category: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
