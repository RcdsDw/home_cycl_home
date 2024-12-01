import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/user_controller')
const ZonesController = () => import('#controllers/zones_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
        router.post('/logout', [AuthController, 'logout'])
      })
      .prefix('auth')

    router.get('/users', [UserController, 'getAll'])
    router.get('/users/:id', [UserController, 'getOne'])

    router.post('/zones/new', [ZonesController, 'create'])
    router.get('/zones', [ZonesController, 'getAll'])
    router.get('/zones/:id', [ZonesController, 'getOne'])
  })
  .prefix('/api/v1')
