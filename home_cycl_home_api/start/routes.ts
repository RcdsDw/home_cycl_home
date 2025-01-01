import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/user_controller')
const ZonesController = () => import('#controllers/zones_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    quoi: 'coubeh',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.put('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
        router.post('/logout', [AuthController, 'logout'])
      })
      .prefix('auth')

    router.put('/users/new', [UserController, 'create'])
    router.patch('/users/:id', [UserController, 'update'])
    router.delete('/users/:id', [UserController, 'delete'])
    router.get('/users', [UserController, 'getAll'])
    router.get('/users/:id', [UserController, 'getOne'])
    router.get('/users/tech', [UserController, 'getTechUsers'])

    router.put('/zones/new', [ZonesController, 'create'])
    router.patch('/zones/:id', [ZonesController, 'update'])
    router.delete('/zones/:id', [ZonesController, 'delete'])
    router.get('/zones', [ZonesController, 'getAll'])
    router.get('/zones/:id', [ZonesController, 'getOne'])
  })
  .prefix('/api/v1')
