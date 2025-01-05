import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UserController = () => import('#controllers/user_controller')
const ZonesController = () => import('#controllers/zones_controller')
const AuthController = () => import('#controllers/auth_controller')
const InterventionsController = () => import('#controllers/intervention_controller')
const ProductsController = () => import('#controllers/product_controller')

// Authentification
router
  .group(() => {
    router.put('/register', [AuthController, 'register']) // Inscription
    router.post('/login', [AuthController, 'login']) // Connexion
  })
  .prefix('api/v1/auth')

// Routes API v1
router
  .group(() => {
    router
      .group(() => {
        router.post('/logout', [AuthController, 'logout']) // Déconnexion
      })
      .prefix('auth')
    // Utilisateurs
    router.put('/users/new', [UserController, 'create']) // Création utilisateur
    router.patch('/users/:id', [UserController, 'update']) // Mise à jour utilisateur
    router.delete('/users/:id', [UserController, 'delete']) // Suppression utilisateur
    router.get('/users', [UserController, 'getAll']) // Liste des utilisateurs
    router.get('/users/tech', [UserController, 'getTechUsers']) // Liste des utilisateurs ayant le rôle "tech"
    router.get('/users/:id', [UserController, 'getOne']) // Détails d'un utilisateur

    // Zones
    router.put('/zones/new', [ZonesController, 'create']) // Création zone
    router.patch('/zones/:id', [ZonesController, 'update']) // Mise à jour zone
    router.delete('/zones/:id', [ZonesController, 'delete']) // Suppression zone
    router.get('/zones', [ZonesController, 'getAll']) // Liste des zones
    router.get('/zones/:id', [ZonesController, 'getOne']) // Détails d'une zone

    // Interventions
    router.put('/interventions', [InterventionsController, 'create']) // Création intervention
    router.patch('/interventions/:id', [InterventionsController, 'update']) // Mise à jour intervention
    router.delete('/interventions/:id', [InterventionsController, 'delete']) // Suppression intervention
    router.get('/interventions', [InterventionsController, 'getAll']) // Liste des interventions
    router.get('/interventions/:id', [InterventionsController, 'getOne']) // Détails d'une intervention

    // Produits
    router.get('/products', [ProductsController, 'getAll']) // Liste des produits
  })
  .prefix('api/v1')
// .use(middleware.auth())
