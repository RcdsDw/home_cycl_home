import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  
async run() {
  const users = [
    {
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
    },
    {
      firstname: 'Alain',
      lastname: 'Dex',
      number: '0101010101',
      email: 'alain@dex.com',
      address: JSON.stringify({
        value: "12 Rue de la République 69001 Lyon",
        data: {
          label: "12 Rue de la République 69001 Lyon",
          score: 0.9646881818181816,
          housenumber: "12",
          id: "69001_1234_00001",
          banId: "a1b2c3d4-56ef-7890-gh12-i34j56kl7890",
          name: "12 Rue de la République",
          postcode: "69001",
          citycode: "69001",
          x: 690316.27,
          y: 6245000.03,
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "housenumber",
          importance: 0.61157,
          street: "Rue de la République"
        },
        geo: {
          type: "Point",
          coordinates: [4.835659, 45.759723]  // Coordonnées pour Lyon
        }
      }),
      password: 'password',
      role: 'tech',
    },
    {
      firstname: 'Emma',
      lastname: 'Tompouce',
      number: '0202020202',
      email: 'emma@tompouce.com',
      address: JSON.stringify({
        value: "24 Rue des Alpes 69002 Lyon",
        data: {
          label: "24 Rue des Alpes 69002 Lyon",
          score: 0.9646881818181816,
          housenumber: "24",
          id: "69002_2345_00002",
          banId: "a2b3c4d5-67ef-8901-hj23-k45l67mn8901",
          name: "24 Rue des Alpes",
          postcode: "69002",
          citycode: "69002",
          x: 690417.17,
          y: 6246000.07,
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "housenumber",
          importance: 0.61157,
          street: "Rue des Alpes"
        },
        geo: {
          type: "Point",
          coordinates: [4.835659, 45.764713]  // Coordonnées pour Lyon
        }
      }),
      password: 'password',
      role: 'tech',
    },
    {
      firstname: 'Laurie',
      lastname: 'Culaire',
      number: '0303030303',
      email: 'laurie@culaire.com',
      address: JSON.stringify({
        value: "56 Avenue de Saxe 69006 Lyon",
        data: {
          label: "56 Avenue de Saxe 69006 Lyon",
          score: 0.9646881818181816,
          housenumber: "56",
          id: "69006_3456_00003",
          banId: "b3c4d5e6-78fg-9012-ij34-k56l78mn9012",
          name: "56 Avenue de Saxe",
          postcode: "69006",
          citycode: "69006",
          x: 690510.27,
          y: 6247100.12,
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "housenumber",
          importance: 0.61157,
          street: "Avenue de Saxe"
        },
        geo: {
          type: "Point",
          coordinates: [4.850000, 45.765432]  // Coordonnées pour Lyon
        }
      }),
      password: 'password',
      role: 'tech',
    },
    {
      firstname: 'Anne',
      lastname: 'Ulaire',
      number: '0404040404',
      email: 'anne@ulaire.com',
      address: JSON.stringify({
        value: "78 Boulevard des Brotteaux 69006 Lyon",
        data: {
          label: "78 Boulevard des Brotteaux 69006 Lyon",
          score: 0.9646881818181816,
          housenumber: "78",
          id: "69006_4567_00004",
          banId: "c4d5e6f7-89gh-0123-jk45-l67m78no0123",
          name: "78 Boulevard des Brotteaux",
          postcode: "69006",
          citycode: "69006",
          x: 690500.17,
          y: 6247250.07,
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "housenumber",
          importance: 0.61157,
          street: "Boulevard des Brotteaux"
        },
        geo: {
          type: "Point",
          coordinates: [4.860659, 45.765987]  // Coordonnées pour Lyon
        }
      }),
      password: 'password',
      role: 'tech',
    },
    {
      firstname: 'Telma',
      lastname: 'Geur',
      number: '0505050505',
      email: 'telma@geur.com',
      address: JSON.stringify({
        value: "15 Rue du Général Brosset 69007 Lyon",
        data: {
          label: "15 Rue du Général Brosset 69007 Lyon",
          score: 0.9646881818181816,
          housenumber: "15",
          id: "69007_5678_00005",
          banId: "d5e6f7g8-90hi-1234-jk56-m78n89op1234",
          name: "15 Rue du Général Brosset",
          postcode: "69007",
          citycode: "69007",
          x: 690420.27,
          y: 6248000.12,
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "housenumber",
          importance: 0.61157,
          street: "Rue du Général Brosset"
        },
        geo: {
          type: "Point",
          coordinates: [4.820659, 45.730987]  // Coordonnées pour Lyon
        }
      }),
      password: 'password',
      role: 'tech',
    }
  ];

  // Création des utilisateurs
  for (const user of users) {
    await User.create(user);
  }
}
}
