import Zone from '#models/zone'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ZonesController {
  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'coordinates', 'user_id'])

      if (!Array.isArray(data.coordinates) || data.coordinates.length === 0) {
        return response.badRequest({
          message: 'Les coordonnées doivent être un tableau non vide.',
        })
      }

      for (let i = 0; i < data.coordinates.length; i++) {
        const { lat, lng } = data.coordinates[i]
        if (typeof lat !== 'number' || typeof lng !== 'number') {
          return response.badRequest({
            message: `Les coordonnées à l'index ${i} sont invalides. Les valeurs lat et lng doivent être des nombres.`,
          })
        }
      }

      const user = await User.find(data.user_id)

      if (!user) {
        return response.badRequest({
          message: "Aucun utilisateur avec le rôle 'tech' trouvé.",
        })
      }

      // Associer l'utilisateur à la zone
      data.coordinates = JSON.stringify(data.coordinates)

      const zone = await Zone.create(data)
      return response.created({ message: 'Zone créée avec succès', data: zone })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la création de la zone',
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    try {
      const zone = await Zone.findOrFail(id)
      const data = request.only(['name', 'coordinates'])

      if (!Array.isArray(data.coordinates) || data.coordinates.length === 0) {
        return response.badRequest({
          message: 'Les coordonnées doivent être un tableau non vide.',
        })
      }

      zone.merge(data)
      await zone.save()

      return response.ok({ message: 'Zone modifiée avec succès', data: zone })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la modification de la zone',
        error: error.message,
      })
    }
  }

  public async delete({ params, response }: HttpContext) {
    const { id } = params
    try {
      const zone = await Zone.findOrFail(id)
      await zone.delete()
      return response.ok({ message: 'Zone supprimée avec succès' })
    } catch (error) {
      return response.notFound({ message: 'Zone non trouvée', error: error.message })
    }
  }

  public async getAll({ response }: HttpContext) {
    try {
      const zones = await Zone.all()
      return response.ok({ message: 'Liste des zones récupérée avec succès', data: zones })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la récupération des zones',
        error: error.message,
      })
    }
  }

  public async getOne({ params, response }: HttpContext) {
    const { id } = params
    try {
      const zone = await Zone.findOrFail(id)
      return response.ok({ message: 'Zone récupérée avec succès', data: zone })
    } catch (error) {
      return response.notFound({ message: 'Zone non trouvée', error: error.message })
    }
  }
}
