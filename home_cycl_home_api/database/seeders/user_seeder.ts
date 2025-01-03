import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      firstname: 'Admin',
      lastname: 'Admin',
      number: '0123456789',
      address: JSON.stringify({
        value: "4 Rue Erik Satie 65000 Tarbes",
        data: {
          label: "4 Rue Erik Satie 65000 Tarbes",
          score: 0.9646881818181816,
          housenumber: "4",
          id: "65440_1174_00004",
          banId: "c5afb7a6-46de-4d81-b31d-c673486b6f3c",
          name: "4 Rue Erik Satie",
          postcode: "65000",
          citycode: "65440",
          x: 460315.27,
          y: 6241110.03,
          city: "Tarbes",
          context: "65, Hautes-Pyrénées, Occitanie",
          type: "housenumber",
          importance: 0.61157,
          street: "Rue Erik Satie"
        },
        geo: {
          type: "Point",
          coordinates: [0.050855,43.228904]
        }
      }),
      email: 'admin@admin.com',
      password: 'password',
      role: 'admin',
    })
  }
}