import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async getUserById({ params, response }: HttpContext) {
    const { id } = params

    const user = await User.findBy('id', id)

    if (!user) {
      return response.badRequest("Cet utilisateur n'existe pas")
    }

    return response.created({
      message: 'Utilisateur trouvé',
      user: user.serialize(),
    })
  }
}
