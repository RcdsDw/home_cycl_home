import Intervention from '#models/intervention'
import type { HttpContext } from '@adonisjs/core/http'

export default class InterventionsController {
  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'started_at',
        'ended_at',
        'price',
        'service',
        'bike',
        'tech_id',
        'client_id',
      ])
      const products = request.input('products', [])

      const intervention = await Intervention.create(data)

      const productData = products.map((product: { id: number; quantity: number }) => ({
        product_id: product.id,
        quantity: product.quantity,
      }))

      await intervention.related('products').attach(
        productData.reduce((acc: any, product: any) => {
          acc[product.product_id] = { quantity: product.quantity }
          return acc
        }, {})
      )

      return response.created({ message: 'Intervention créée avec succès', data: intervention })
    } catch (error) {
      return response.badRequest({
        message: "Erreur lors de la création de l'intervention",
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    try {
      const data = request.only([
        'started_at',
        'ended_at',
        'price',
        'service',
        'bike',
        'tech_id',
        'client_id',
      ])
      const products = request.input('products', [])

      const intervention = await Intervention.findOrFail(id)
      intervention.merge(data)
      await intervention.save()

      if (products.length > 0) {
        await intervention.related('products').sync(
          products.map((product: { id: number; quantity: number }) => ({
            product_id: product.id,
            quantity: product.quantity,
          }))
        )
      }

      return response.ok({ message: 'Intervention modifiée avec succès', data: intervention })
    } catch (error) {
      return response.badRequest({
        message: "Erreur lors de la mise à jour de l'intervention",
        error: error.message,
      })
    }
  }

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

  public async getAll({ response }: HttpContext) {
    try {
      const interventions = await Intervention.query()
        .preload('products')
        .orderBy('created_at', 'desc')

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

  public async getOne({ params, response }: HttpContext) {
    const { id } = params
    try {
      const intervention = await Intervention.query()
        .where('id', id)
        .preload('products')
        .firstOrFail()
      return response.ok({ message: 'Intervention récupérée avec succès', data: intervention })
    } catch (error) {
      return response.notFound({ message: 'Intervention non trouvée', error: error.message })
    }
  }
}
