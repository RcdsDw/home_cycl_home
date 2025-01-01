import { BaseSchema } from '@adonisjs/lucid/schema'

export default class User extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('firstname').nullable()
      table.string('lastname').nullable()
      table.string('number', 15).notNullable().unique()
      table.json('address').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('role').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
