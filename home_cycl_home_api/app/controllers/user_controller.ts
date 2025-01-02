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
      return response.created({ message: 'Utilisateur créé avec succès', data: user })
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('number')) {
          return response.status(406).send({
            field: 'number',
            message: 'Le numéro de téléphone existe déjà.',
          })
        }
        if (error.detail.includes('email')) {
          return response.status(406).send({
            field: 'email',
            message: "L'adresse email existe déjà.",
          })
        }
      }
      return response.badRequest({
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    try {
      const user = await User.findOrFail(id)
      const data = request.only([
        'firstname',
        'lastname',
        'number',
        'address',
        'email',
        'password',
        'role',
      ])
      user.firstname = data.firstname
      user.lastname = data.lastname
      user.number = data.number
      user.address = data.address
      user.email = data.email
      user.password = data.password
      user.role = data.role
      user.save()
      return response.created({ message: 'Utilisateur modifié avec succès', data: user })
    } catch (error) {
      return response.badRequest({
        message: "Erreur lors de la modification de l'utilisateur",
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
      return response.ok({ message: 'Utilisateur récupéré avec succès', data: user })
    } catch (error) {
      return response.notFound({ message: 'Utilisateur non trouvée', error: error.message })
    }
  }

  public async getTechUsers({ response }: HttpContext) {
    try {
      const techUsers = await User.query().where('role', 'tech').exec()
      return response.ok({ message: 'Utilisateurs récupérés avec succès', data: techUsers })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la récupération des utilisateurs avec le rôle "tech"',
        error: error.message,
      })
    }
  }
}
