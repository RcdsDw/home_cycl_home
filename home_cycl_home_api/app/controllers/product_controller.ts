import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  public async getAll({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.ok({
        message: 'Liste des produits récupérée avec succès',
        data: products,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Erreur lors de la récupération des produits',
        error: error.message,
      })
    }
  }
}
