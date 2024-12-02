import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'firstname',
        'lastname',
        'number',
        'address',
        'email',
        'password',
        'role',
      ])
      const user = await User.create(data)
      return response.created({ message: 'Utilisateur créée avec succès', data: user })
    } catch (error) {
      return response.badRequest({
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message,
      })
    }
  }

  public async delete({ params, response }: HttpContext) {
    const { id } = params

    try {
      const user = await User.findOrFail(id)
      await user.delete()
      return response.ok({ message: 'Utilisateur supprimé avec succès' })
    } catch (error) {
      return response.notFound({ message: 'Utilisateur non trouvée', error: error.message })
    }
  }

  public async getAll({ response }: HttpContext) {
    try {
      const users = await User.all()
      return response.ok({ message: 'Liste des utilisateurs récupérée avec succès', data: users })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la récupération des utilisateurs',
        error: error.message,
      })
    }
  }

  public async getOne({ params, response }: HttpContext) {
    const { id } = params

    try {
      const user = await User.findOrFail(id)
      return response.ok({ message: 'Utilisateur récupérée avec succès', data: user })
    } catch (error) {
      return response.notFound({ message: 'Utilisateur non trouvée', error: error.message })
    }
  }
}
