import { BaseSchema } from '@adonisjs/lucid/schema'

export default class InterventionProduct extends BaseSchema {
  protected tableName = 'intervention_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Lien avec la table interventions
      table
        .integer('intervention_id')
        .unsigned()
        .references('id')
        .inTable('interventions')
        .onDelete('CASCADE')

      // Lien avec la table products
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')

      // Quantité de produits dans l'intervention
      table.integer('quantity').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
