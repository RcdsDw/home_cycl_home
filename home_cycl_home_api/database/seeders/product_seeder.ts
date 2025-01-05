import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: 'Chaîne de vélo',
        price: 15.99,
        quantity: 100,
      },
      {
        name: 'Pneu de rechange',
        price: 29.99,
        quantity: 50,
      },
      {
        name: 'Selle confortable',
        price: 45.99,
        quantity: 30,
      },
      {
        name: 'Câble de frein',
        price: 9.99,
        quantity: 80,
      },
      {
        name: 'Kit de lumière LED',
        price: 25.5,
        quantity: 40,
      },
      {
        name: 'Antivol en U',
        price: 35.0,
        quantity: 60,
      },
      {
        name: 'Pompe à vélo portable',
        price: 12.0,
        quantity: 90,
      },
      {
        name: 'Garde-boue universel',
        price: 8.5,
        quantity: 70,
      },
      {
        name: 'Casque de vélo',
        price: 55.0,
        quantity: 25,
      },
      {
        name: 'Panier avant en métal',
        price: 20.0,
        quantity: 45,
      },
    ])
  }
}
