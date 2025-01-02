import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      firstname: 'Admin',
      lastname: 'Admin',
      number: '0123456789',
      address: JSON.stringify({
        street: '8 Place de Fourvière',
        city: 'Lyon',
        postalCode: '69005',
      }),
      email: 'admin@admin.com',
      password: await hash.make('password'),
      role: 'admin',
    })
  }
}