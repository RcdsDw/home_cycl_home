import Intervention from '#models/intervention'
import type { HttpContext } from '@adonisjs/core/http'

export default class InterventionsController {
  // Création d'une intervention
  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['started_at', 'ended_at', 'price', 'category'])

      // Vérification que les données sont valides
      if (!data.started_at || !data.ended_at || !data.price || !data.category) {
        return response.badRequest({
          message: 'Tous les champs sont requis : started_at, ended_at, price, category.',
        })
      }

      // Création de l'intervention
      const intervention = await Intervention.create(data)

      return response.created({ message: 'Intervention créée avec succès', data: intervention })
    } catch (error) {
      return response.badRequest({
        message: "Erreur lors de la création de l'intervention",
        error: error.message,
      })
    }
  }

  // Mise à jour d'une intervention
  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    try {
      const intervention = await Intervention.findOrFail(id)
      const data = request.only(['started_at', 'ended_at', 'price', 'category'])

      // Vérification que les données sont valides
      if (!data.started_at || !data.ended_at || !data.price || !data.category) {
        return response.badRequest({
          message: 'Tous les champs sont requis : started_at, ended_at, price, category.',
        })
      }

      intervention.merge(data)
      await intervention.save()

      return response.ok({ message: 'Intervention modifiée avec succès', data: intervention })
    } catch (error) {
      return response.badRequest({
        message: "Erreur lors de la modification de l'intervention",
        error: error.message,
      })
    }
  }

  // Suppression d'une intervention
  public async delete({ params, response }: HttpContext) {
    const { id } = params
    try {
      const intervention = await Intervention.findOrFail(id)
      await intervention.delete()
      return response.ok({ message: 'Intervention supprimée avec succès' })
    } catch (error) {
      return response.notFound({ message: 'Intervention non trouvée', error: error.message })
    }
  }

  // Récupération de toutes les interventions
  public async getAll({ response }: HttpContext) {
    try {
      const interventions = await Intervention.all()
      return response.ok({
        message: 'Liste des interventions récupérée avec succès',
        data: interventions,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la récupération des interventions',
        error: error.message,
      })
    }
  }

  // Récupération d'une intervention par son ID
  public async getOne({ params, response }: HttpContext) {
    const { id } = params
    try {
      const intervention = await Intervention.findOrFail(id)
      return response.ok({ message: 'Intervention récupérée avec succès', data: intervention })
    } catch (error) {
      return response.notFound({ message: 'Intervention non trouvée', error: error.message })
    }
  }
}
