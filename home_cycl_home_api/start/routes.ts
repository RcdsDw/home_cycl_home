import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])

    router.get('/users/:id', [UserController, 'getUserById'])
  })
  .prefix('/api/v1')
